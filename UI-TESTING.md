# UI Testing Guide

This guide provides step-by-step instructions to test the Task Manager App UI after completing frontend and backend configurations.

---

## Prerequisites

- Backend server running (XAMPP or PHP built-in server)
- MySQL database configured and running
- Frontend app running on emulator/simulator
- Database tables created (users, tasks, tokens)

---

## Test 1: User Registration

1. **Launch the app** on emulator/simulator
2. **On Login screen**, tap "Don't have an account? Signup"
3. **Fill in the form:**
   - Name: `John Doe`
   - Email: `john@example.com`
   - Password: `test123`
4. **Tap "Register" button**
5. **Expected:** Success alert "Account created. Please login."
6. **Verify:** You're redirected back to Login screen

---

## Test 2: Input Validation

1. **On Signup screen**, try invalid inputs:
   - Empty fields → "All fields required"
   - Invalid email (e.g., `notanemail`) → "Invalid email format"
   - Short password (e.g., `123`) → "Password must be at least 4 characters"
2. **Expected:** Validation alerts appear

---

## Test 3: User Login

1. **On Login screen**, enter credentials:
   - Email: `john@example.com`
   - Password: `test123`
2. **Tap "Login" button**
3. **Expected:** 
   - Loading indicator appears briefly
   - Redirected to Tasks screen
   - Header shows "Tasks" with "Logout" button

---

## Test 4: Create Task

1. **On Tasks screen**, tap the blue "+ Add" button (bottom right)
2. **Fill in task details:**
   - Title: `Complete project documentation`
   - Description: `Write comprehensive README`
   - Status: Select `pending`
3. **Tap "Create Task" button**
4. **Expected:**
   - Success alert "Task created"
   - Redirected back to Tasks screen
   - New task appears in the list

---

## Test 5: View Tasks

1. **On Tasks screen**, verify task card displays:
   - Task title
   - Task description
   - Status (in orange for pending/in_progress, green for completed)
   - "Edit" and "Delete" buttons
2. **Pull down to refresh** the list
3. **Expected:** Loading indicator appears, tasks reload

---

## Test 6: Edit Task

1. **Tap "Edit" button** on any task
2. **Modify task details:**
   - Change title to: `Updated task title`
   - Change status to: `in_progress`
3. **Tap "Update Task" button**
4. **Expected:**
   - Success alert "Task updated"
   - Task list refreshes with updated information
   - Status color changes

---

## Test 7: Delete Task

1. **Tap "Delete" button** on any task
2. **Expected:**
   - Task is removed from the list immediately
   - Task list refreshes

---

## Test 8: Empty State

1. **Delete all tasks** from the list
2. **Expected:** Message displays "No tasks yet. Add one to get started!"

---

## Test 9: Error Handling

1. **Stop the backend server** (stop XAMPP or PHP server)
2. **Try to create a task**
3. **Expected:** Error alert appears with retry option
4. **Restart backend server**
5. **Pull to refresh** or tap retry
6. **Expected:** Tasks load successfully

---

## Test 10: Session Persistence

1. **Close the app** completely (swipe away from recent apps)
2. **Reopen the app**
3. **Expected:** 
   - App opens directly to Tasks screen (still logged in)
   - Tasks are displayed

---

## Test 11: Logout

1. **On Tasks screen**, tap "Logout" button (top right)
2. **Expected:**
   - Redirected to Login screen
   - Cannot navigate back to Tasks screen

---

## Test 12: Login with Wrong Credentials

1. **On Login screen**, enter:
   - Email: `john@example.com`
   - Password: `wrongpassword`
2. **Tap "Login" button**
3. **Expected:** Error alert "Invalid password"
4. **Verify:** Still on Login screen

---

## Test 13: Status Filter Visual

1. **Create tasks with different statuses:**
   - Task 1: Status `pending`
   - Task 2: Status `in_progress`
   - Task 3: Status `completed`
2. **Expected:**
   - Pending/In Progress tasks show orange status text
   - Completed tasks show green status text

---

## Test 14: Long Text Handling

1. **Create a task with long text:**
   - Title: 150+ characters
   - Description: 500+ characters
2. **Expected:**
   - Text displays properly without overflow
   - Card expands to fit content

---

## Test 15: Network Timeout

1. **Turn off WiFi/Data** on device
2. **Try to fetch tasks** (pull to refresh)
3. **Expected:** Error alert "Failed to fetch tasks"
4. **Turn on WiFi/Data**
5. **Pull to refresh**
6. **Expected:** Tasks load successfully

---

## UI Test Checklist

Use this checklist to track your testing progress:

- [ ] Registration works with valid data
- [ ] Validation errors show for invalid inputs
- [ ] Login works with correct credentials
- [ ] Login fails with wrong credentials
- [ ] Tasks list displays correctly
- [ ] Create task works
- [ ] Edit task works
- [ ] Delete task works
- [ ] Pull-to-refresh works
- [ ] Empty state shows when no tasks
- [ ] Status colors display correctly (orange/green)
- [ ] Logout works
- [ ] Session persists after app restart
- [ ] Error handling works (network errors)
- [ ] Loading indicators appear during operations

---

## Common Issues During Testing

**Issue: Cannot connect to backend**
- Verify backend URL in `src/services/authService.js` and `taskService.js`
- Android Emulator: Use `10.0.2.2` instead of `localhost`
- iOS Simulator: Use `localhost`

**Issue: Tasks not loading**
- Check backend server is running
- Verify MySQL database is running
- Check token is valid (not expired)

**Issue: App crashes on login**
- Check Redux store is properly configured
- Verify all reducers are combined correctly
- Check console logs for errors

**Issue: Validation not working**
- Verify validation logic in screen files
- Check Alert is imported from react-native

---

## Reporting Issues

When reporting issues found during testing, include:

1. **Test number** (e.g., Test 4: Create Task)
2. **Steps to reproduce**
3. **Expected behavior**
4. **Actual behavior**
5. **Screenshots** (if applicable)
6. **Device/Emulator** information
7. **Console logs** (if available)

---

## Next Steps After Testing

Once all tests pass:

1. Review code for any improvements
2. Add more unit tests for edge cases
3. Consider adding integration tests
4. Prepare for production deployment
5. Document any known limitations