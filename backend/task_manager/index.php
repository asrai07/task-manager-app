<?php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

require_once "config/db.php";

$request_method = $_SERVER["REQUEST_METHOD"];
$uri = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
$uri = explode('/', trim($uri, '/'));

$endpoint = $uri[2] ?? null;
$id = $uri[3] ?? null;


/* ================= HELPER FUNCTIONS ================= */

function sendResponse($status, $data, $code = 200) {
    http_response_code($code);
    echo json_encode($data);
    exit;
}

function getTokenFromHeader() {

    // 1️⃣ Check standard PHP server variable
    if (isset($_SERVER['HTTP_AUTHORIZATION'])) {
        return $_SERVER['HTTP_AUTHORIZATION'];
    }

    // 2️⃣ Check Apache headers (case insensitive)
    if (function_exists('apache_request_headers')) {
        $headers = apache_request_headers();
        foreach ($headers as $key => $value) {
            if (strtolower($key) === 'authorization') {
                return $value;
            }
        }
    }

    return null;
}


/* ================= REGISTER ================= */
if ($endpoint === "register" && $request_method === "POST") {

    $data = json_decode(file_get_contents("php://input"), true);

    $name = trim($data['name'] ?? '');
    $email = trim($data['email'] ?? '');
    $password = trim($data['password'] ?? '');

    if (empty($name) || empty($email) || empty($password)) {
        sendResponse(false, ["error" => "All fields required"], 400);
    }

    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        sendResponse(false, ["error" => "Invalid email format"], 400);
    }

    $hashedPassword = password_hash($password, PASSWORD_DEFAULT);

    try {
        $stmt = $conn->prepare("INSERT INTO users (name, email, password) VALUES (?, ?, ?)");
        $stmt->execute([$name, $email, $hashedPassword]);

        sendResponse(true, ["message" => "User registered successfully"]);
    } catch (PDOException $e) {
        sendResponse(false, ["error" => "User already exists"], 400);
    }
}

/* ================= LOGIN ================= */
if ($endpoint === "login" && $request_method === "POST") {

    $data = json_decode(file_get_contents("php://input"), true);

    $email = trim($data['email'] ?? '');
    $password = trim($data['password'] ?? '');

    if (empty($email) || empty($password)) {
        sendResponse(false, ["error" => "Email and password required"], 400);
    }

    $stmt = $conn->prepare("SELECT * FROM users WHERE email = ?");
    $stmt->execute([$email]);
    $user = $stmt->fetch(PDO::FETCH_ASSOC);

    if (!$user) {
        sendResponse(false, ["error" => "Email not found"], 401);
    }

    if (!password_verify($password, $user['password'])) {
        sendResponse(false, ["error" => "Invalid password"], 401);
    }

    // Generate simple token
    $token = bin2hex(random_bytes(32));

    sendResponse(true, [
        "message" => "Login successful",
        "token" => $token,
        "user" => [
            "id" => $user['id'],
            "name" => $user['name'],
            "email" => $user['email']
        ]
    ]);
}

/* ================= AUTH CHECK ================= */
if ($endpoint === "tasks") {

    $token = getTokenFromHeader();

    if (!$token) {
        sendResponse(false, ["error" => "Unauthorized"], 401);
    }

    /* ===== GET TASKS ===== */
    if ($request_method === "GET") {

        $user_id = $_GET['user_id'] ?? null;

        if (!$user_id) {
            sendResponse(false, ["error" => "user_id required"], 400);
        }

        $stmt = $conn->prepare("SELECT * FROM tasks WHERE user_id = ?");
        $stmt->execute([$user_id]);
        $tasks = $stmt->fetchAll(PDO::FETCH_ASSOC);

        sendResponse(true, ["data" => $tasks]);
    }

    /* ===== CREATE TASK ===== */
    if ($request_method === "POST") {

        $data = json_decode(file_get_contents("php://input"), true);

        $user_id = $data['user_id'] ?? null;
        $title = trim($data['title'] ?? '');
        $description = trim($data['description'] ?? '');
        $status = "pending";

        if (!$user_id || empty($title)) {
            sendResponse(false, ["error" => "Missing required fields"], 400);
        }

        $stmt = $conn->prepare("INSERT INTO tasks (user_id, title, description, status, created_at) VALUES (?, ?, ?, ?, NOW())");
        $stmt->execute([$user_id, $title, $description, $status]);

        sendResponse(true, ["message" => "Task created"]);
    }

    /* ===== UPDATE TASK ===== */
   if ($request_method === "PUT" && $id) {

    $data = json_decode(file_get_contents("php://input"), true);

    $title = trim($data['title'] ?? '');
    $description = trim($data['description'] ?? '');
    $status = trim($data['status'] ?? '');

    $stmt = $conn->prepare("
        UPDATE tasks 
        SET title = ?, description = ?, status = ?
        WHERE id = ?
    ");

    $stmt->execute([$title, $description, $status, $id]);

    sendResponse(true, ["message" => "Task updated"]);
}

}

sendResponse(false, ["error" => "Invalid route"], 404);
?>
