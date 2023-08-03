@extends('emails.layouts.default')
@section('content')
<table class="es-content" cellspacing="0" cellpadding="0" align="center" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;table-layout:fixed !important;width:100%">
    <tr>
     <td align="center" style="padding:0;Margin:0">
      <table class="es-content-body" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:#FFFFFF;border-top:10px solid #ff2919;width:600px;border-bottom:10px solid #ff2919" cellspacing="0" cellpadding="0" bgcolor="#ffffff" align="center">
        <tr>
         <td align="left" style="padding:0;Margin:0;padding-left:20px;padding-right:20px;padding-top:30px">
          <table width="100%" cellspacing="0" cellpadding="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
            <tr>
             <td valign="top" align="center" style="padding:0;Margin:0;width:560px">
              <table width="100%" cellspacing="0" cellpadding="0" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                <tr>
                 <td align="left" style="padding:0;Margin:0"><p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;line-height:21px;color:#666666;font-size:14px">{{ $actualDate }}</p></td>
                </tr>
              </table></td>
            </tr>
          </table></td>
        </tr>
        <tr>
         <td style="padding:0;Margin:0;padding-top:20px;padding-left:20px;padding-right:20px;background-image:url(https://tmugfz.stripocdn.email/content/guids/CABINET_dffae7f979b41546fc080436b1b370e5/images/61791626685093335.png);background-repeat:no-repeat;background-position:center 80px" background="https://tmugfz.stripocdn.email/content/guids/CABINET_dffae7f979b41546fc080436b1b370e5/images/61791626685093335.png" align="left">
          <table width="100%" cellspacing="0" cellpadding="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
            <tr>
             <td valign="top" align="center" style="padding:0;Margin:0;width:560px">
              <table width="100%" cellspacing="0" cellpadding="0" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                <tr>
                 <td class="es-m-txt-l" align="left" style="padding:0;Margin:0;padding-top:5px;padding-bottom:10px"><h3 style="Margin:0;line-height:24px;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;font-size:20px;font-style:normal;font-weight:bold;color:#ff2919">{{ __('messages.mail.welcome.message_5', ['name' => $toUser->name]) }}</h3></td>
                </tr>
                <tr>
                 <td align="left" style="padding:0;Margin:0;padding-top:5px;padding-bottom:10px"><p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;line-height:21px;color:#333333;font-size:14px">{{ __('messages.mail.welcome.message_1')}}<br><br><strong>{{ __('messages.mail.welcome.message_2')}}</strong></p>
                  <p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;line-height:21px;color:#333333;font-size:14px">{{ __('messages.mail.welcome.message_3') }}: <a href="{{ $appUrl.'/auth/login' }}" target="_blank">{{ __('messages.mail.welcome.link_1') }}</a><br>{{ __('messages.mail.welcome.message_4') }}: {{$toUser->email}}<br>@if($password) {{ __('messages.mail.welcome.message_6') }}: {{ $password }} @endif<br><br>{!! __('messages.mail.welcome.message_7', ['name' => $appName]) !!}<br><br></p></td>
                </tr>
              </table></td>
            </tr>
          </table></td>
        </tr>
      </table></td>
    </tr>
  </table>
  @if($fromUser)
  <table class="es-content" cellspacing="0" cellpadding="0" align="center" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;table-layout:fixed !important;width:100%">
    <tr>
     <td align="center" style="padding:0;Margin:0">
      <table class="es-content-body" cellspacing="0" cellpadding="0" bgcolor="#ffffff" align="center" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:#FFFFFF;width:600px">
        <tr>
         <td align="left" style="padding:20px;Margin:0"><!--[if mso]><table style="width:560px" cellpadding="0" cellspacing="0"><tr><td style="width:115px" valign="top"><![endif]-->
          <table class="es-left" cellspacing="0" cellpadding="0" align="left" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;float:left">
            <tr>
             <td align="left" style="padding:0;Margin:0;width:115px">
              <table width="100%" cellspacing="0" cellpadding="0" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                <tr>
                 <td class="es-m-txt-c" style="padding:0;Margin:0;padding-top:5px;padding-bottom:5px;font-size:0px" align="right"><div style="width:115px;height:115px;background-size: cover; background-position: top center; border-radius: 50%;background-image: url({{ $fromUser->avatar }})"></div></td>
                </tr>
              </table></td>
            </tr>
          </table><!--[if mso]></td><td style="width:20px"></td><td style="width:425px" valign="top"><![endif]-->
          <table class="es-right" cellspacing="0" cellpadding="0" align="right" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;float:right">
            <tr>
             <td align="left" style="padding:0;Margin:0;width:425px">
              <table width="100%" cellspacing="0" cellpadding="0" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                <tr>
                 <td class="es-m-txt-c" align="left" style="padding:0;Margin:0"><h3 style="Margin:0;line-height:30px;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;font-size:20px;font-style:normal;font-weight:bold;color:#ff2919">{{ $fromUser->name }}</h3><p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;line-height:21px;color:#333333;font-size:14px">{{ $fromUser->address }}</p><p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;line-height:21px;color:#333333;font-size:14px"><a target="_blank" style="-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;text-decoration:none;color:#333333;font-size:14px;line-height:21px" href="">{{ $fromUser->phone }}</a></p><p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;line-height:21px;color:#333333;font-size:14px"><a target="_blank" href="mailto:{{ $fromUser->email}}" style="-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;text-decoration:underline;color:#333333;font-size:14px;line-height:21px">{{ $fromUser->email }}</a></p></td>
                </tr>
                <tr>
                 <td class="es-m-txt-c" style="padding:0;Margin:0;padding-top:5px;padding-bottom:5px;font-size:0" align="left">
                  <table class="es-table-not-adapt es-social" cellspacing="0" cellpadding="0" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                    <tr>
                     <td valign="top" align="center" style="padding:0;Margin:0;padding-right:10px"><img title="Facebook" src="https://tmugfz.stripocdn.email/content/assets/img/social-icons/logo-black/facebook-logo-black.png" alt="Fb" width="24" height="24" style="display:block;border:0;outline:none;text-decoration:none;-ms-interpolation-mode:bicubic"></td>
                     <td valign="top" align="center" style="padding:0;Margin:0;padding-right:10px"><img title="Twitter" src="https://tmugfz.stripocdn.email/content/assets/img/social-icons/logo-black/twitter-logo-black.png" alt="Tw" width="24" height="24" style="display:block;border:0;outline:none;text-decoration:none;-ms-interpolation-mode:bicubic"></td>
                     <td valign="top" align="center" style="padding:0;Margin:0;padding-right:10px"><img title="Instagram" src="https://tmugfz.stripocdn.email/content/assets/img/social-icons/logo-black/instagram-logo-black.png" alt="Inst" width="24" height="24" style="display:block;border:0;outline:none;text-decoration:none;-ms-interpolation-mode:bicubic"></td>
                     <td valign="top" align="center" style="padding:0;Margin:0"><img title="Youtube" src="https://tmugfz.stripocdn.email/content/assets/img/social-icons/logo-black/youtube-logo-black.png" alt="Yt" width="24" height="24" style="display:block;border:0;outline:none;text-decoration:none;-ms-interpolation-mode:bicubic"></td>
                    </tr>
                  </table></td>
                </tr>
              </table></td>
            </tr>
          </table><!--[if mso]></td></tr></table><![endif]--></td>
        </tr>
      </table></td>
    </tr>
  </table>
 @endif
@stop
