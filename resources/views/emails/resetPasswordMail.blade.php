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
                 <td class="es-m-txt-l" align="left" style="padding:0;Margin:0;padding-top:5px;padding-bottom:10px"><h3 style="Margin:0;line-height:24px;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;font-size:20px;font-style:normal;font-weight:bold;color:#ff2919">{{ __('messages.mail.reset_password.message_1', ['name' => $toUser->name]) }}</h3></td>
                </tr>
                <tr>
                 <td align="left" style="padding:0;Margin:0;padding-top:5px;padding-bottom:10px"><p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;line-height:21px;color:#333333;font-size:14px">{{ __('messages.mail.reset_password.message_2') }}</p>
                  <p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;line-height:21px;color:#333333;font-size:14px">{{ __('messages.mail.reset_password.message_3') }}<br><br></p></td>
                </tr>
                <tr>
                 <td align="center" style="padding:0;Margin:0;padding-top:20px;padding-bottom:20px">
                  <span class="es-button-border" style="border-style:solid;border-color:#ff2919;background:#ff2919;border-width:0px;display:inline-block;border-radius:5px;width:auto"><a href="{{ $appUrl }}/auth/reset-password?token={{ $token }}&email={{ urlencode($toUser->email) }}" class="es-button" target="_blank" style="mso-style-priority:100!important;text-decoration:none!important;mso-line-height-rule:exactly;color:#FFFFFF;font-size:16px;border-style:solid;border-color:#ff2919;background:#ff2919;border-width:15px 30px;display:inline-block;background:#ff2919;border-radius:5px;font-family:arial, 'helvetica neue', helvetica, sans-serif;font-weight:bold;font-style:normal;line-height:19px;width:auto;text-align:center">{{ __('messages.mail.reset_password.button') }}</a></span>
                 </td>
                </tr>
                <tr>
                 <td align="left" style="padding:0;Margin:0;padding-top:5px;padding-bottom:10px"><p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;line-height:21px;color:#333333;font-size:14px">{{ __('messages.mail.reset_password.message_4') }}<br><br>{!! __('messages.mail.reset_password.message_5', ['name' => $appName]) !!}<br><br></p></td>
                </tr>
              </table></td>
            </tr>
          </table></td>
        </tr>
      </table></td>
    </tr>
  </table>
@stop

