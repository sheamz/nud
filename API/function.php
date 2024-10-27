<?php

require __DIR__ . '/../API/database/database_conn.php';


function error422($message)
{
    $data = [
        'status' => 422,
        'message' => $message,
    ];
    header("HTTP/1.0 422 Unprocessable Entity");
    echo json_encode($data);
    exit();
}

/*--READ BulldogExchangeReviews Starts Here--*/
function getBulldogExchangeReviews($userInput)
{

    global $conn;

    $item_id = mysqli_real_escape_string($conn, $userInput['item_id']);
    $filter = mysqli_real_escape_string($conn, $userInput['filter']);

    if ($filter == "new") {
        $filter_name = "tbl_product_review.created_at";
        $filter_type = "DESC";
    } else if ($filter == "old") {
        $filter_name = "tbl_product_review.created_at";
        $filter_type = "ASC";
    } else if ($filter == "high") {
        $filter_name = "tbl_product_review.rating";
        $filter_type = "DESC";
    } else if ($filter == "low") {
        $filter_name = "tbl_product_review.rating";
        $filter_type = "ASC";
    } else if ($filter == "name") {
        $filter_name = "tbl_users.f_name";
        $filter_type = "ASC";
    }

    $query = "SELECT 
        tbl_users.f_name,
        tbl_users.m_name,
        tbl_users.l_name,
        tbl_users.profile_picture,
        tbl_product_review.rating,
        tbl_product_review.created_at,
        tbl_product_review.comments
    FROM
    tbl_product_review
    INNER JOIN tbl_users ON tbl_users.user_id = tbl_product_review.sender_id
    WHERE to_review='$item_id' 
	ORDER BY $filter_name $filter_type";

    $query_run = mysqli_query($conn, $query);

    if ($query_run) {

        if (mysqli_num_rows($query_run) > 0) {

            $res = mysqli_fetch_all($query_run, MYSQLI_ASSOC);

            $data = [
                'status' => 200,
                'message' => 'Bulldog Exchange Reviews List Fetched Successfully',
                'data' => $res
            ];
            header("HTTP/1.0 200 OK");
            return json_encode($data);
        } else {
            $data = [
                'status' => 404,
                'message' => 'No Bulldog Exchange Review Found',
            ];
            header("HTTP/1.0 404 No Bulldog Exchange Review Found");
            return json_encode($data);
        }
    } else {
        $data = [
            'status' => 500,
            'message' => 'Internal Server Error',
        ];
        header("HTTP/1.0 500 Internal Server Error");
        return json_encode($data);
    }
}

function getBulldogExchangeTotalReview($userInput)
{
    global $conn;

    $item_id = mysqli_real_escape_string($conn, $userInput['item_id']);

    $query = "SELECT 
    COUNT(tbl_product_review.review_id) as total_review, COUNT(tbl_product_review.rating) as number_rating, SUM(tbl_product_review.rating) as total_rating
    FROM tbl_product_review WHERE to_review='$item_id'";

    $query_run = mysqli_query($conn, $query);

    if ($query_run) {

        if (mysqli_num_rows($query_run) > 0) {

            $res = mysqli_fetch_assoc($query_run);
            $total_review = $res['total_review'];
            $total_rating = $res['total_rating'];
            $number_rating = $res['number_rating'];
            $rating_star = $total_rating / $number_rating;
            $rating_star = round($rating_star, 1);

            $data = [
                'status' => 200,
                'message' => 'Bulldog Exchange Reviews List Fetched Successfully',
                'data' => [
                    'total_rating' => $total_rating,
                    'total_review' => $total_review,
                    'rating_star' => $rating_star,
                ]
            ];
            header("HTTP/1.0 200 OK");
            return json_encode($data);
        } else {
            $data = [
                'status' => 404,
                'message' => 'No Bulldog Exchange Review Found',
            ];
            header("HTTP/1.0 404 No Bulldog Exchange Review Found");
            return json_encode($data);
        }
    } else {
        $data = [
            'status' => 500,
            'message' => 'Internal Server Error',
        ];
        header("HTTP/1.0 500 Internal Server Error");
        return json_encode($data);
    }
}


/*--READ BulldogExchangeReviews Ends Here--*/

// function userLogin($userInput)
// {

//     global $conn;

//     $email = mysqli_real_escape_string($conn, $userInput['email']);
//     $password = mysqli_real_escape_string($conn, $userInput['password']);

//     if (empty(trim($email)) || empty(trim($password))) {
//         error422('Email and Password are required');
//     } else {
//         $query = "SELECT * FROM tbl_users WHERE email = '$email' AND password = '$password' LIMIT 1";
//         $result = mysqli_query($conn, $query);

//         if ($result) {
//             if (mysqli_num_rows($result) == 1) {
//                 $res = mysqli_fetch_assoc($result);

//                 $data = [
//                     'status' => 200,
//                     'message' => 'User Found',
//                     'data' => $res
//                 ];
//                 header("HTTP/1.0 200 User Found");
//                 return json_encode($data);
//             } else {
//                 $data = [
//                     'status' => 404,
//                     'message' => 'User Not Found. Please check your email and password',
//                 ];
//                 header("HTTP/1.0 404 User Not Found");
//                 return json_encode($data);
//             }
//         }
//     }
// }

// INSERT NEW COMMENT START
function insertComment($userInput)
{
    global $conn;

    $sender_id = mysqli_real_escape_string($conn, $userInput['sender_id']);
    $rating = mysqli_real_escape_string($conn, $userInput['rating']);
    $comments = mysqli_real_escape_string($conn, $userInput['comments']);
    $item = mysqli_real_escape_string($conn, $userInput['to_review']);

    if (empty(trim($sender_id))) {
        error422('Sender ID is required');
    } else if (empty(trim($rating))) {
        error422('Rating is required');
    } else if (empty(trim($comments))) {
        error422('Comments are required');
    } else if (empty(trim($item))) {
        error422('Item to review is required');
    } else {
        $query = "INSERT INTO tbl_product_review (sender_id, to_review, comments,rating) VALUES ('$sender_id', '$item', '$comments', '$rating')";
        $result = mysqli_query($conn, $query);

        if ($result) {
            $data = [
                'status' => 201,
                'message' => 'Comment Added Successfully',
            ];
            header("HTTP/1.0 201 Created");
            return json_encode($data);
        } else {
            $data = [
                'status' => 500,
                'message' => 'Internal Server Error',
            ];
            header("HTTP/1.0 500 Internal Server Error");
            return json_encode($data);
        }
    }
}
// INSERT NEW COMMENT END


/*--READ BulldogExchangeProductData Starts Here--*/
function getBulldogExchangeProductData()
{
    global $conn;

    $query = "SELECT 
        tbl_inventory_items.item_id,
        tbl_inventory_items.item_name,
        tbl_inventory_items.item_image,
        tbl_inventory_items.description,
        tbl_inventory_items.quantity,
        tbl_inventory_items.price
    FROM
    tbl_inventory_items;";

    $query_run = mysqli_query($conn, $query);

    if ($query_run) {
        if (mysqli_num_rows($query_run) > 0) {
            $res = mysqli_fetch_all($query_run, MYSQLI_ASSOC);

            $data = [
                'status' => 200,
                'message' => 'Bulldog Exchange Product Data List Fetched Successfully',
                'data' => $res
            ];
            header("HTTP/1.0 200 OK");
            return json_encode($data);
        } else {
            $data = [
                'status' => 404,
                'message' => 'No Bulldog Exchange Product Data Found',
            ];
            header("HTTP/1.0 404 Not Found");
            return json_encode($data);
        }
    } else {
        $data = [
            'status' => 500,
            'message' => 'Internal Server Error',
        ];
        header("HTTP/1.0 500 Internal Server Error");
        return json_encode($data);
    }
}
/*--READ BulldogExchangeProductData Ends Here--*/


/*--READ BulldogExchangeProductData Starts Here--*/
function getProductData($userInput)
{

    global $conn;

    $item_id = mysqli_real_escape_string($conn, $userInput['item_id']);

    if (empty(trim($item_id))) {
        return error422('Enter valid item id');
    } else {

        $query = "SELECT 
        tbl_inventory_items.item_id,
        tbl_inventory_items.item_name,
        tbl_inventory_items.item_image,
        tbl_inventory_items.description,
        tbl_inventory_items.quantity,
        tbl_inventory_items.price
    FROM
    tbl_inventory_items
    WHERE item_id='$item_id';";

        $result = mysqli_query($conn, $query);

        if ($result) {

            if (mysqli_num_rows($result) > 0) {

                $res = mysqli_fetch_all($result, MYSQLI_ASSOC);

                $data = [
                    'status' => 200,
                    'message' => 'Donation Fetched Successfully',
                    'data' => $res
                ];
                header("HTTP/1.0 200 OK");
                return json_encode($data);
            } else {
                $data = [
                    'status' => 404,
                    'message' => 'No Donation Found',
                ];
                header("HTTP/1.0 404 Not Found");
                return json_encode($data);
            }
        } else {

            $data = [
                'status' => 500,
                'message' => 'Internal Server Error',
            ];
            header("HTTP/1.0 500 Internal Server Error");
            return json_encode($data);
        }
    }
}
/*--READ BulldogExchangeProductData Ends Here--*/


// READ CALENDAR EVENTS START
function getCalendarEvents()
{
    global $conn;

    $query = "SELECT tbl_events.event_id, tbl_users.l_name, tbl_users.f_name,
        tbl_events.title, tbl_events.description, tbl_events.start_date,
        tbl_events.end_date, tbl_venue.name AS venue_name, tbl_event_type.name AS event_type
    FROM
    tbl_events
    INNER JOIN tbl_users ON tbl_events.user_id = tbl_users.user_id
    INNER JOIN tbl_venue ON tbl_events.venue_id = tbl_venue.venue_id
    INNER JOIN tbl_event_type ON tbl_events.event_type = tbl_event_type.type_id";

    $result = mysqli_query($conn, $query);

    if ($result) {
        if (mysqli_num_rows($result) > 0) {
            $res = mysqli_fetch_all($result, MYSQLI_ASSOC);

            $data = [
                'status' => 200,
                'message' => 'Events List Fetched Successfully',
                'data' => $res
            ];
            header("HTTP/1.0 200 OK");
            return json_encode($data);
        } else {
            $data = [
                'status' => 404,
                'message' => 'No Events Found',
            ];
            header("HTTP/1.0 404 Not Found");
            return json_encode($data);
        }
    } else {
        $data = [
            'status' => 500,
            'message' => 'Internal Server Error',
        ];
        header("HTTP/1.0 500 Internal Server Error");
        return json_encode($data);
    }
}
// READ CALENDAR EVENTS END

function insertFeedback($userInput, $user_id)
{
    global $conn;

    $contactInfo = $userInput['contactInfo'];
    $questions = $userInput['questions'];
    $responses = $userInput['responses'];

    $email = mysqli_real_escape_string($conn, $contactInfo['email']);
    $firstName = mysqli_real_escape_string($conn, $contactInfo['firstName']);
    $lastName = mysqli_real_escape_string($conn, $contactInfo['lastName']);
    $phone = mysqli_real_escape_string($conn, $contactInfo['phone']);
    $program = mysqli_real_escape_string($conn, $contactInfo['program'] ?? "");
    $section = mysqli_real_escape_string($conn, $contactInfo['section'] ?? "");
    $yearLevel = mysqli_real_escape_string($conn, $contactInfo['yearLevel'] ?? "");

    $additionalComments = mysqli_real_escape_string($conn, $questions['additionalComments']);
    $concernsAboutNU = mysqli_real_escape_string($conn, $questions['concernsAboutNU']);
    $likeAboutNU = mysqli_real_escape_string($conn, $questions['likeAboutNU']);

    $response1 = $responses[0];
    $response2 = $responses[1];
    $response3 = $responses[2];
    $response4 = $responses[3];
    $response5 = $responses[4];
    $response6 = $responses[5];
    $response7 = $responses[6];

    if (empty(trim($email))) {
        error422('Email is required');
    } else if (empty(trim($firstName))) {
        error422('First Name is required');
    } else if (empty(trim($lastName))) {
        error422('Last Name is required');
    } else if (empty(trim($phone))) {
        error422('Phone is required');
    } else if (empty(trim($additionalComments))) {
        error422('Additional Comments is required');
    } else if (empty(trim($concernsAboutNU))) {
        error422('Concerns About NU is required');
    } else if (empty(trim($likeAboutNU))) {
        error422('Like About NU is required');
    } else if (empty(trim($response1))) {
        error422('Response 1 is required');
    } else if (empty(trim($response2))) {
        error422('Response 2 is required');
    } else if (empty(trim($response3))) {
        error422('Response 3 is required');
    } else if (empty(trim($response4))) {
        error422('Response 4 is required');
    } else if (empty(trim($response5))) {
        error422('Response 5 is required');
    } else if (empty(trim($response6))) {
        error422('Response 6 is required');
    } else if (empty(trim($response7))) {
        error422('Response 7 is required');
    } else {
        $query = "INSERT INTO  tbl_nudhub_feedback (
            user_id, 
            email,
            first_name,
            last_name,
            phone_number, 
            program, 
            year_level, 
            section) 
            VALUES (
            '$user_id', 
            '$email',
            '$firstName',
            '$lastName',
            '$phone', 
            '$program', 
            '$yearLevel', 
            '$section')";

        $result = mysqli_query($conn, $query);

        if ($result) {
            $feedback_id = mysqli_insert_id($conn);

            $query2 = "INSERT INTO tbl_nudhub_feedback_answers(
                feedback_id,
                text_question_like,
                text_question_concern,
                additional,
                question_1,
                question_2,
                question_3,
                question_4,
                question_5,
                question_6,
                question_7
                ) VALUES (
                '$feedback_id',
                '$likeAboutNU',
                '$concernsAboutNU',
                '$additionalComments',
                '$response1',
                '$response2',
                '$response3',
                '$response4',
                '$response5',
                '$response6',
                '$response7')";
            $result2 = mysqli_query($conn, $query2);

            if ($result2) {
                $data = [
                    'status' => 201,
                    'message' => 'Feedback Response Added Successfully',
                ];
                header("HTTP/1.0 201 Created");
                return json_encode($data);
            }
        }
    }
}

function readUserProfile($userInput)
{
    global $conn;

    $user_id = mysqli_real_escape_string($conn, $userInput['user_id']);

    $query = "SELECT email, f_name, l_name FROM tbl_users WHERE user_id = '$user_id' LIMIT 1";
    $result = mysqli_query($conn, $query);

    if ($result) {
        if (mysqli_num_rows($result) == 1) {
            $res = mysqli_fetch_assoc($result);

            $data = [
                'status' => 200,
                'message' => 'User Found',
                'data' => $res
            ];
            header("HTTP/1.0 200 OK");
            return json_encode($data);
        } else {
            $data = [
                'status' => 404,
                'message' => 'User Not Found',
            ];
            header("HTTP/1.0 404 Not Found");
            return json_encode($data);
        }
    } else {
        $data = [
            'status' => 500,
            'message' => 'Internal Server Error',
        ];
        header("HTTP/1.0 500 Internal Server Error");
        return json_encode($data);
    }
}

function insertGuestFeedback($userInput, $user_id)
{
    global $conn;

    $fname = mysqli_real_escape_string($conn, $userInput['f_name'] ?? "anonymous");
    $lname = mysqli_real_escape_string($conn, $userInput['l_name'] ?? "anonymous");
    $email = mysqli_real_escape_string($conn, $userInput['email'] ?? "anonymous");
    $phone = mysqli_real_escape_string($conn, $userInput['phone'] ?? "anonymous");
    $responseLoop = $userInput['response'];

    if (empty(trim($fname))) {
        return error422('First Name is required');
    } else if (empty(trim($lname))) {
        return error422('Last Name is required');
    } else if (empty(trim($email))) {
        return error422('Email is required');
    } else if (empty(trim($phone))) {
        return error422('Phone is required');
    } else {
        // Start transaction
        mysqli_begin_transaction($conn);

        // Insert guest info
        $query = "INSERT INTO tbl_nudhub_feedback_guest_info (guest_info_id, f_name, l_name, email, phone) VALUES (?, ?, ?, ?, ?)";
        $stmt = $conn->prepare($query);
        $stmt->bind_param('sssss', $user_id, $fname, $lname, $email, $phone);
        $result = $stmt->execute();
        $stmt->close();

        if ($result) {
            // Insert feedback
            $query2 = "INSERT INTO tbl_nudhub_feedback_guest (date_created) VALUES (CURDATE())";
            $stmt2 = $conn->prepare($query2);
            $result2 = $stmt2->execute();
            $stmt2->close();

            if ($result2) {
                $feedback_id = mysqli_insert_id($conn);

                // Update guest info with feedback ID
                $query3 = "UPDATE tbl_nudhub_feedback_guest_info SET feedback_id = ? WHERE guest_info_id = ?";
                $stmt3 = $conn->prepare($query3);
                $stmt3->bind_param('ss', $feedback_id, $user_id);
                $result3 = $stmt3->execute();
                $stmt3->close();

                if ($result3) {
                    try {
                        // Insert responses
                        foreach ($responseLoop as $response) {
                            $question_id = $response['question_id'];
                            $response_content = $response['response'];

                            $query4 = "INSERT INTO tbl_nudhub_feedback_guest_answers (feedback_id, question_id, content) VALUES (?, ?, ?)";
                            $stmt4 = $conn->prepare($query4);
                            $stmt4->bind_param('iis', $feedback_id, $question_id, $response_content);
                            $result4 = $stmt4->execute();
                            $stmt4->close();

                            if (!$result4) {
                                throw new Exception("Failed to insert response");
                            }
                        }

                        mysqli_commit($conn);
                        $data = [
                            'status' => 201,
                            'message' => 'Feedback Response Added Successfully',
                        ];
                        header("HTTP/1.0 201 Created");
                        return json_encode($data);
                    } catch (Exception $e) {
                        mysqli_rollback($conn);
                        $data = [
                            'status' => 500,
                            'message' => $e->getMessage(),
                        ];
                        header("HTTP/1.0 500 Internal Server Error");
                        return json_encode($data);
                    }
                }
            }
        }

        mysqli_rollback($conn);
        $data = [
            'status' => 500,
            'message' => 'Internal Server Error',
        ];
        header("HTTP/1.0 500 Internal Server Error");
        return json_encode($data);
    }
}

function insertUserFeedback($userInput, $user_id)
{
    global $conn;

    $responseLoop = $userInput['response'];

    mysqli_begin_transaction($conn);

    $query = "INSERT INTO tbl_nudhub_feedback_user(user_id, date_created) VALUES (?, NOW())";
    $stmt = $conn->prepare($query);
    $stmt->bind_param('s', $user_id);
    $result = $stmt->execute();
    $stmt->close();

    if ($result) {
        $feedback_id = mysqli_insert_id($conn);
        try {
            foreach ($responseLoop as $response) {
                $question_id = $response['question_id'];
                $response_content = $response['response'];

                $query2 = "INSERT INTO tbl_nudhub_feedback_user_answers(feedback_id, question_id, content) VALUES (?, ?, ?)";
                $stmt2 = $conn->prepare($query2);
                $stmt2->bind_param('iis', $feedback_id, $question_id, $response_content);
                $result2 = $stmt2->execute();
                $stmt2->close();

                if (!$result2) {
                    throw new Exception("Failed to insert response");
                }
            }

            mysqli_commit($conn);
            $data = [
                'status' => 201,
                'message' => 'Feedback Response Added Successfully',
            ];
            header("HTTP/1.0 201 Created");
            return json_encode($data);
        } catch (Exception $e) {
            mysqli_rollback($conn);
            $data = [
                'status' => 500,
                'message' => $e->getMessage(),
            ];
            header("HTTP/1.0 500 Internal Server Error");
            return json_encode($data);
        }
    }

    mysqli_rollback($conn);
    $data = [
        'status' => 500,
        'message' => 'Internal Server Error',
    ];
    header("HTTP/1.0 500 Internal Server Error");
    return json_encode($data);
}

// READ POSTS FROM TNIG NATIONALIAN
function getPostsWithComments()
{
    global $conn;

    // SQL query to join tbl_posts, tbl_likes, and tbl_comments
    $query = "SELECT 
                tbl_posts.user_id, 
                tbl_posts.title, 
                tbl_posts.content, 
                tbl_posts.date, 
                COUNT(tbl_comments.comment_id) AS comment_count
              FROM tbl_posts
              LEFT JOIN tbl_comments ON tbl_posts.post_id = tbl_comments.post_id
              GROUP BY tbl_posts.post_id";

    $result = mysqli_query($conn, $query);

    if ($result) {
        if (mysqli_num_rows($result) > 0) {
            $res = mysqli_fetch_all($result, MYSQLI_ASSOC);

            $data = [
                'status' => 200,
                'message' => 'Posts with Comments Fetched Successfully',
                'data' => $res
            ];
            header("HTTP/1.0 200 OK");
            return json_encode($data);
        } else {
            $data = [
                'status' => 404,
                'message' => 'No Posts Found',
            ];
            header("HTTP/1.0 404 Not Found");
            return json_encode($data);
        }
    } else {
        $data = [
            'status' => 500,
            'message' => 'Internal Server Error',
        ];
        header("HTTP/1.0 500 Internal Server Error");
        return json_encode($data);
    }
}

function getEvents()
{
    global $conn;

    $query = "SELECT * FROM db_sysinteg.tbl_accepted_reservations LEFT JOIN tbl_venue ON tbl_accepted_reservations.venue = tbl_venue.venue_id;";
    $result = mysqli_query($conn, $query);

    if ($result) {
        if (mysqli_num_rows($result) > 0) {
            $res = mysqli_fetch_all($result, MYSQLI_ASSOC);

            $data = [
                'status' => 200,
                'message' => 'Events List Fetched Successfully',
                'data' => $res
            ];
            header("HTTP/1.0 200 OK");
            return json_encode($data);
        } else {
            $data = [
                'status' => 404,
                'message' => 'No Events Found',
            ];
            header("HTTP/1.0 200 ok");
            return json_encode($data);
        }
    } else {
        $data = [
            'status' => 500,
            'message' => 'Internal Server Error',
        ];
        header("HTTP/1.0 500 Internal Server Error");
        return json_encode($data);
    }
}



// READ FEEDBACK USER START
function readFeedbackUser()
{
    global $conn;

    $query = "SELECT 
                tbl_nudhub_feedback_user_answers.answer_id,
                tbl_nudhub_feedback_user_answers.content,
                tbl_nudhub_feedback_question.question_id,
                tbl_users.f_name
    FROM
    tbl_nudhub_feedback_user_answers
    INNER JOIN tbl_nudhub_feedback_user ON tbl_nudhub_feedback_user_answers.feedback_id = tbl_nudhub_feedback_user.feedback_id
    INNER JOIN tbl_users ON tbl_nudhub_feedback_user.user_id = tbl_users.user_id
    INNER JOIN tbl_nudhub_feedback_question ON tbl_nudhub_feedback_user_answers.question_id = tbl_nudhub_feedback_question.question_id
    WHERE tbl_nudhub_feedback_question.question_id = 1";

    $result = mysqli_query($conn, $query);

    if ($result) {
        if (mysqli_num_rows($result) > 0) {
            $res = mysqli_fetch_all($result, MYSQLI_ASSOC);

            $data = [
                'status' => 200,
                'message' => 'Feedback List Fetched Successfully',
                'data' => $res
            ];
            header("HTTP/1.0 200 OK");
            return json_encode($data);
        } else {
            $data = [
                'status' => 404,
                'message' => 'No Feedback Found',
            ];
            header("HTTP/1.0 404 Not Found");
            return json_encode($data);
        }
    } else {
        $data = [
            'status' => 500,
            'message' => 'Internal Server Error',
        ];
        header("HTTP/1.0 500 Internal Server Error");
        return json_encode($data);
    }
}
// READ FEEDBACK USER END

// READ FEEDBACK GUEST START
function readFeedbackGuest()
{
    global $conn;

    $query = "SELECT 
                tbl_nudhub_feedback_guest_answers.answer_id,
                tbl_nudhub_feedback_guest_answers.content,
                tbl_nudhub_feedback_question.question_id,
                tbl_nudhub_feedback_guest_info.f_name
    FROM
    tbl_nudhub_feedback_guest_answers
    INNER JOIN tbl_nudhub_feedback_guest_info ON tbl_nudhub_feedback_guest_answers.feedback_id = tbl_nudhub_feedback_guest_info.feedback_id
    INNER JOIN tbl_nudhub_feedback_question ON tbl_nudhub_feedback_guest_answers.question_id = tbl_nudhub_feedback_question.question_id
    WHERE tbl_nudhub_feedback_question.question_id = 1";

    $result = mysqli_query($conn, $query);

    if ($result) {
        if (mysqli_num_rows($result) > 0) {
            $res = mysqli_fetch_all($result, MYSQLI_ASSOC);

            $data = [
                'status' => 200,
                'message' => 'Feedback List Fetched Successfully',
                'data' => $res
            ];
            header("HTTP/1.0 200 OK");
            return json_encode($data);
        } else {
            $data = [
                'status' => 404,
                'message' => 'No Feedback Found',
            ];
            header("HTTP/1.0 404 Not Found");
            return json_encode($data);
        }
    } else {
        $data = [
            'status' => 500,
            'message' => 'Internal Server Error',
        ];
        header("HTTP/1.0 500 Internal Server Error");
        return json_encode($data);
    }
}
// READ FEEDBACK GUEST END
