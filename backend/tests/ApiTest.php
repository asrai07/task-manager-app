<?php
use PHPUnit\Framework\TestCase;

class ApiTest extends TestCase
{
    private $baseUrl = 'http://localhost/task_manager/index.php';
    
    public function testRegisterWithValidData()
    {
        $data = [
            'name' => 'Test User',
            'email' => 'test' . time() . '@example.com',
            'password' => 'test123'
        ];
        
        $response = $this->makeRequest('POST', '/register', $data);
        
        $this->assertEquals(200, $response['status']);
        $this->assertArrayHasKey('message', $response['body']);
    }
    
    public function testRegisterWithInvalidEmail()
    {
        $data = [
            'name' => 'Test User',
            'email' => 'invalid-email',
            'password' => 'test123'
        ];
        
        $response = $this->makeRequest('POST', '/register', $data);
        
        $this->assertEquals(400, $response['status']);
        $this->assertArrayHasKey('error', $response['body']);
    }
    
    public function testLoginWithValidCredentials()
    {
        // First register
        $email = 'testlogin' . time() . '@example.com';
        $this->makeRequest('POST', '/register', [
            'name' => 'Test User',
            'email' => $email,
            'password' => 'test123'
        ]);
        
        // Then login
        $response = $this->makeRequest('POST', '/login', [
            'email' => $email,
            'password' => 'test123'
        ]);
        
        $this->assertEquals(200, $response['status']);
        $this->assertArrayHasKey('token', $response['body']);
        $this->assertArrayHasKey('user', $response['body']);
    }
    
    public function testLoginWithInvalidCredentials()
    {
        $response = $this->makeRequest('POST', '/login', [
            'email' => 'nonexistent@example.com',
            'password' => 'wrongpass'
        ]);
        
        $this->assertEquals(401, $response['status']);
        $this->assertArrayHasKey('error', $response['body']);
    }
    
    public function testCreateTaskWithoutToken()
    {
        $response = $this->makeRequest('POST', '/tasks', [
            'user_id' => 1,
            'title' => 'Test Task',
            'description' => 'Test Description',
            'status' => 'pending'
        ]);
        
        $this->assertEquals(401, $response['status']);
    }
    
    public function testCreateTaskWithInvalidStatus()
    {
        $token = $this->getAuthToken();
        
        $response = $this->makeRequest('POST', '/tasks', [
            'user_id' => 1,
            'title' => 'Test Task',
            'description' => 'Test',
            'status' => 'invalid_status'
        ], $token);
        
        $this->assertEquals(400, $response['status']);
    }
    
    private function makeRequest($method, $endpoint, $data = [], $token = null)
    {
        $url = $this->baseUrl . $endpoint;
        $ch = curl_init($url);
        
        $headers = ['Content-Type: application/json'];
        if ($token) {
            $headers[] = 'Authorization: ' . $token;
        }
        
        curl_setopt($ch, CURLOPT_CUSTOMREQUEST, $method);
        curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($data));
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
        
        $response = curl_exec($ch);
        $status = curl_getinfo($ch, CURLINFO_HTTP_CODE);
        curl_close($ch);
        
        return [
            'status' => $status,
            'body' => json_decode($response, true)
        ];
    }
    
    private function getAuthToken()
    {
        $email = 'testtoken' . time() . '@example.com';
        $this->makeRequest('POST', '/register', [
            'name' => 'Test User',
            'email' => $email,
            'password' => 'test123'
        ]);
        
        $response = $this->makeRequest('POST', '/login', [
            'email' => $email,
            'password' => 'test123'
        ]);
        
        return $response['body']['token'];
    }
}