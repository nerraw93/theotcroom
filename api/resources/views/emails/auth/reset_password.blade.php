@component('mail::message')
Hello {{ $user->first_name . ' ' . $user->last_name }},

Reset your password.
<br>
@component('mail::button', ['url' => route('auth.validate.reset_password', ['token' => $token]) ])
Reset Password
@endcomponent
<br>
{{ route('auth.validate.reset_password', ['token' => $token]) }}
<br>
You can copy-paste the code above into your browser if the link won't work.
<br>

Cheers,<br>
The {{ config('app.name') }} team
@endcomponent
