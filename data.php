<?php

isset($_POST['a'])? $action = $_POST['a'] : $action = "";
$msg = null;

if($action == "doLogin") {

    $chkLogin = false; isset($_POST['fldUsername'])?
    $uName = $_POST['fldUsername'] : $uName = ""; isset($_POST['fldPassword'])?
    $uPassword = $_POST['fldPassword'] : $uPassword = "";
    $hashed_password = hash("sha512", $uPassword."kDl*63(7"); openDB();
    $query = " SELECT
    lpa_user_ID, lpa_user_username, lpa_user_password,
    lpa_user_group
    FROM
    lpa_users WHERE
    lpa_user_username = '$uName' AND
    lpa_user_password = '$hashed_password' AND
    lpa_user_status <> 'D'
    LIMIT 1
    ";
$result = $db->query($query);
$row = $result->fetch_assoc(); if($row['lpa_user_username'] == $uName) { if($row['lpa_user_password'] == $hashed_password) {
$_SESSION['authUser'] = $row['lpa_user_ID'];
$_SESSION['isAdmin'] = (($row['lpa_user_group']=="administrator")?true:false);
if(!empty($_SESSION['authUser'])){
lpa_log("User {$uName} successfully logged in.");


header("Location: index.php"); exit;
}
}
}
openDB();
$query = " SELECT
lpa_user_ID, lpa_user_username, lpa_user_password,
lpa_user_group
FROM
lpa_users WHERE
lpa_user_username = '$uName' AND
lpa_user_password = '$uPassword' AND
lpa_user_status <> 'D'
LIMIT 1 ";
$result = $db->query($query);
$row = $result->fetch_assoc(); if($row['lpa_user_username'] == $uName) {









?>