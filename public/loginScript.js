document.addEventListener('DOMContentLoaded', async () => {

    const departmentForm = document.getElementById('departmentForm');
    const otherForm = document.getElementById('otherForm');


    userRole.addEventListener('change', function () {
        const selectedRole = userRole.value;

        departmentForm.style.display = 'none';
        otherForm.style.display = 'none';

        if (selectedRole === 'department') {
            departmentForm.style.display = 'block';
        } else {
            otherForm.style.display = 'block';
        }
    });



    // For all other user authentication
    document.getElementById('otherForm').addEventListener('submit', function (event) {
        event.preventDefault(); // Prevent the default form submission

        otherForm.addEventListener('submit', async (event) => {
            event.preventDefault(); // Prevent the form from submitting the default way

            const userRole = document.getElementById('userRole').value;
            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;

            try {
                const response = await fetch('/auth/login', {
                    method: 'POST',
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        username,
                        password,
                    })
                });

                const result = await response.json();
                console.log('Response received:', result);

                if (response.ok) {
                    // alert(result.message);
                    otherForm.reset();
                    window.location.href = 'dashboard.html';
                } else {
                    alert(result.message);
                }
            } catch (error) {
                alert('Failed to login user: ' + error.message);
            }
        });

        // Redirect to the dashboard page
        // window.location.href = 'dashboard.html';
    });




    // For all department authentication
    document.getElementById('departmentForm').addEventListener('submit', function (event) {
        event.preventDefault(); // Prevent the default form submission

        departmentForm.addEventListener('submit', async (event) => {
            event.preventDefault(); // Prevent the form from submitting the default way

            const userRole = "department";
            const username = document.getElementById('individualUsername').value;
            const departmentId = document.getElementById('departmentId').value;
            const password = document.getElementById('departmentPassword').value;

            try {
                const response = await fetch('/auth/login', {
                    method: 'POST',
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        departmentId,
                        username,
                        password,
                    })
                });

                const result = await response.json();
                console.log('Response received:', result);

                if (response.ok) {
                    // alert(result.message);
                    otherForm.reset();
                    window.location.href = 'dashboard.html';
                } else {
                    // Display error message
                    // document.getElementById('error-message').innerText = result.message;
                    // document.getElementById('error-message').style.display = 'block';
                    alert(result.message);
                }
            } catch (error) {
                alert('Failed to login user: ' + error.message);
            }
        });

        // Redirect to the dashboard page
        // window.location.href = 'dashboard.html';
    });
});