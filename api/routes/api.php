<?php

use Illuminate\Support\Facades\Route;

header('Access-Control-Allow-Origin: ' . env('APP_URL_FRONTEND'));
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS, OPTION');
header('Access-Control-Allow-Headers: Accept, Content-Type, Authorization');

/**
 * Guest routes
 */
Route::namespace('Api')->group(function() {

    Route::namespace('Auth')->group(function() {
        Route::post('register', 'UserController@register')->name('register');
        Route::get('verify/user/{code}', 'UserController@verify')->name('verify.user');
        Route::post('login', 'UserController@login')->name('login');
    });

    Route::namespace('Order')->group(function() {
        Route::get('order/{id}', 'IndexController@index');
    });
    Route::get('icos/all/{name?}', 'IcoController@all');

    Route::get('reservations/count', 'ReservationController@countReservations');

    //** /api/reset/password
    Route::prefix('reset/password')->namespace('Auth')->group(function() {
        Route::name('reset.password.send')->post('send', 'PasswordController@sendResetPassword');
        Route::name('reset.password.form')->get('{token}/form', 'PasswordController@resetPasswordForm');
        Route::name('reset.password')->post('', 'PasswordController@resetPassword');
    });
});

/**
 * Auth routes
 */
Route::middleware('auth:api')->namespace('Api')->group(function () {

    /**
     * Admin route
     * @route /api/admin
     */
    Route::middleware('admin')->prefix('admin')->namespace('Admin')->group(function() {
        Route::get('dashboard/statistics', 'DashboardController@index');
        Route::get('dashboard/users', 'DashboardController@users');
        Route::get('dashboard/members', 'DashboardController@members');
        Route::get('dashboard/members/summary', 'DashboardController@membersSummary');

        Route::get('dashboard/orders', 'DashboardController@orders');

        Route::get('user/{id}/details', 'UserController@details');
        Route::post('user/{id}/disable', 'UserController@disable');
        Route::post('user/{id}/enable', 'UserController@enable');

        Route::post('order/{id}/disable', 'IcoController@disable');
        Route::post('order/{id}/enable', 'IcoController@enable');
    });

    /**
     * User routes
     * @var /api/user
     */
    Route::get('me', 'UserController@details');
    Route::put('me', 'UserController@update');
    Route::post('me/photo', 'UserController@uploadPhoto');
    Route::post('me/change-password', 'UserController@resetPassword');
    Route::get('me/my-orders', 'IcoController@myOrders');
    Route::get('me/count-deals', 'ReservationController@countDeals');

    Route::get('me/count-users', 'ReservationController@countUsers');
    Route::get('me/users', 'ReservationController@weeklyUsers');
    Route::get('me/users/{from}/{to}', 'ReservationController@weeklyUsersByDate');
    Route::get('me/all-users/', 'UserController@allUsers');
    Route::get('me/recent-users/{name}', 'UserController@searchUsers');

    Route::post('profile/{username}/trust', 'TrustController@trust');
    Route::post('profile/{username}/block', 'BlockController@block');

    // @TODO icos would be rename to `advertisement`
    Route::prefix('icos')->group(function() {
        Route::post('', 'IcoController@store');
        Route::post('{id}/toggle', 'IcoController@toggleShowHidden');
        Route::post('{id}/update-notes', 'IcoController@addNote');
        Route::get('{id}/reservations', 'ReservationController@reservations');
        // Route::post('{id}/reserve', 'ReservationController@reserve');

    });

    //** Advertisement
    Route::namespace('Order')->group(function() {
        Route::post('order/{id}/archive', 'IndexController@archive');
        Route::post('order/{id}/restore', 'IndexController@restore');
        Route::get('order/{id}/check-if-owner', 'IndexController@checkIfOwner');

        Route::get('order/{id}/reservations', 'ReservationController@index');
        Route::post('order/{id}/reservation/store', 'ReservationController@store');
        // Reservation actions
        Route::post('order/{id}/reservation/accept', 'ReservationController@accept')->middleware('isOwner');
        Route::post('order/{id}/reservation/deny', 'ReservationController@deny')->middleware('isOwner');
        Route::post('order/{id}/reservation/complete', 'ReservationController@completed')->middleware('isOwner');

        Route::get('order/{id}/comments', 'CommentController@allComments');
        Route::get('order/{id}/{reservationId}/comments', 'CommentController@index');
        Route::post('order/{id}/{reservationId}/comments/store', 'CommentController@store');
    });

    Route::prefix('member')->group(function() {
        Route::post('{id}/toggle/banned', 'MemberController@toggleBanned');
    });

    Route::post('bank-accounts', 'BankAccountController@store');

    /**
     * Notification routes
     */
    Route::namespace('Notification')->group(function() {
        Route::get('me/notification', 'IndexController@index');
    });

    //** @TODO routes below should be remove/delete - also remove controller or methods on this routes
    Route::get('me/recent-users/', 'UserController@recentUsers');
});
