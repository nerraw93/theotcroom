@component('mail::message')
Hello {{ $user->first_name . ' ' . $user->last_name }},

Welcome to OTC Room. Complete your registration on clicking the button below.
<br>
@component('mail::button', ['url' => route('verify.user', ['code' => $user->verification_code])])
Verify Your Account
@endcomponent
<br>
{{ route('verify.user', ['code' => $user->verification_code]) }}
<br>
<br>
You can copy-paste the code above into your browser if the link won't work.
<br>

Cheers,<br>
The {{ config('app.name') }} team
@endcomponent
