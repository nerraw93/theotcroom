<?php

namespace App\Providers;

use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Bootstrap any application services.
     *
     * @return void
     */
    public function boot()
    {
        Schema::defaultStringLength(191);
        
        self::_greaterThan();
        self::_moreThan();
        self::_afterOrEqualThanToday();
    }

    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {
        //
    }

    private function _greaterThan()
    {
        Validator::extend('greater_than', function($attribute, $value, $parameters, $validator) {
            $data = $validator->getData();

            if (!array_key_exists($parameters[0], $data)) {
                return false;
            }

            $min_value = $data[$parameters[0]];

            return $value > $min_value;
        });

        Validator::replacer('greater_than', function($message, $attribute, $rule, $parameters) {
            return $attribute . ' needs to be grater than ' . $parameters[0];
        });
    }

    private function _moreThan()
    {
        Validator::extend('more_than', function($attribute, $value, $parameters, $validator) {
            return $value > $parameters[0];
        });

        Validator::replacer('more_than', function($message, $attribute, $rule, $parameters) {
            return 'The price needs to be more than 0';
        });
    }

    private function _afterOrEqualThanToday()
    {
        Validator::extend('after_today', function($attribute, $value, $parameters, $validator) {
            return $value > date( 'Y-m-d H:i:s');
        });

        Validator::replacer('after_today', function($message, $attribute) {
            return 'The ' . self::_cleanAttrName($attribute) . ' cannot be before today.';
        });
    }

    private function _cleanAttrName($attr)
    {
        return str_replace('_', ' ', $attr);
    }
}
