<?php

namespace App\Exceptions;

use Exception;
use Illuminate\Foundation\Exceptions\Handler as ExceptionHandler;
use Illuminate\Validation\ValidationException;
use Illuminate\Database\Eloquent\ModelNotFoundException;

class Handler extends ExceptionHandler
{
    /**
     * A list of the exception types that are not reported.
     *
     * @var array
     */
    protected $dontReport = [
        //
    ];

    /**
     * A list of the inputs that are never flashed for validation exceptions.
     *
     * @var array
     */
    protected $dontFlash = [
        'password',
        'password_confirmation',
    ];

    /**
     * Report or log an exception.
     *
     * @param  \Exception  $exception
     * @return void
     */
    public function report(Exception $exception)
    {
        parent::report($exception);
    }

    /**
     * Render an exception into an HTTP response.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Exception  $exception
     * @return \Illuminate\Http\Response
     */
    public function render($request, Exception $exception)
    {
        if ($exception instanceof ModelNotFoundException) {
            $model = str_replace("[App\Models\\", '', $exception->getMessage());
            $model = str_replace(']', '', $model);
            return response()->json([
                'error' => $model,
            ], 404);

            abort(404);
        }

        if ($request->wantsJson()) {

            if ($exception instanceof ValidationException) {
                $errorBag = $exception->errors();
                $errors = [];
                $errorMessage = '';
                foreach ($errorBag as $error) {
                    foreach ($error as $message) {
                        $errorMessage .= $message . "\r\n";
                    }
                }

                return response()->json([
                    'error' => $errorMessage
                ], 401);
            }

            return response()->json([
                'error' => $exception->getMessage(),
                'debug' => [
                    'code' => $exception->getCode(),
                    'line'  => $exception->getLine(),
                    'trace' => $exception->getTrace(),
                ]
            ], 400);
        }

        return parent::render($request, $exception);
    }

    /**
     * Convert a validation exception into a JSON response.
     *
     * @param  [type]              $request   [description]
     * @param  ValidationException $exception [description]
     * @return [type]                         [description]
     */
    protected function invalidJson($request, ValidationException $exception)
    {
        $errorBag = $exception->errors();
        $errors = [];
        $errorMessage = '';
        foreach ($errorBag as $error) {
            foreach ($error as $message) {
                $errorMessage .= $message . "\r\n";
            }
        }

        return response()->json([
            'error' => $errorMessage
        ], 401);
    }

}
