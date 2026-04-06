import { SVGProps } from 'react'

export function LoadingIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" {...props}>
      <g
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      >
        <path strokeDasharray="16" strokeDashoffset="16" d="M12 3c4.97 0 9 4.03 9 9">
          <animate fill="freeze" attributeName="stroke-dashoffset" dur="0.3s" values="16;0" />
          <animateTransform
            attributeName="transform"
            dur="1.5s"
            repeatCount="indefinite"
            type="rotate"
            values="0 12 12;360 12 12"
          />
        </path>
        <path
          strokeDasharray="64"
          strokeDashoffset="64"
          strokeOpacity=".3"
          d="M12 3c4.97 0 9 4.03 9 9c0 4.97 -4.03 9 -9 9c-4.97 0 -9 -4.03 -9 -9c0 -4.97 4.03 -9 9 -9Z"
        >
          <animate fill="freeze" attributeName="stroke-dashoffset" dur="1.2s" values="64;0" />
        </path>
      </g>
    </svg>
  )
}

export function SettingsIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" {...props}>
      <g fill="none" stroke="currentColor" strokeWidth="1.5">
        <path
          strokeLinecap="round"
          d="m21.318 7.141l-.494-.856c-.373-.648-.56-.972-.878-1.101c-.317-.13-.676-.027-1.395.176l-1.22.344c-.459.106-.94.046-1.358-.17l-.337-.194a2 2 0 0 1-.788-.967l-.334-.998c-.22-.66-.33-.99-.591-1.178c-.261-.19-.609-.19-1.303-.19h-1.115c-.694 0-1.041 0-1.303.19c-.261.188-.37.518-.59 1.178l-.334.998a2 2 0 0 1-.789.967l-.337.195c-.418.215-.9.275-1.358.17l-1.22-.345c-.719-.203-1.078-.305-1.395-.176c-.318.129-.505.453-.878 1.1l-.493.857c-.35.608-.525.911-.491 1.234c.034.324.268.584.736 1.105l1.031 1.153c.252.319.431.875.431 1.375s-.179 1.056-.43 1.375l-1.032 1.152c-.468.521-.702.782-.736 1.105s.14.627.49 1.234l.494.857c.373.647.56.971.878 1.1s.676.028 1.395-.176l1.22-.344a2 2 0 0 1 1.359.17l.336.194c.36.23.636.57.788.968l.334.997c.22.66.33.99.591 1.18c.262.188.609.188 1.303.188h1.115c.694 0 1.042 0 1.303-.189s.371-.519.59-1.179l.335-.997c.152-.399.428-.738.788-.968l.336-.194c.42-.215.9-.276 1.36-.17l1.22.344c.718.204 1.077.306 1.394.177c.318-.13.505-.454.878-1.101l.493-.857c.35-.607.525-.91.491-1.234s-.268-.584-.736-1.105l-1.031-1.152c-.252-.32-.431-.875-.431-1.375s.179-1.056.43-1.375l1.032-1.153c.468-.52.702-.781.736-1.105s-.14-.626-.49-1.234Z"
        />
        <path d="M15.52 12a3.5 3.5 0 1 1-7 0a3.5 3.5 0 0 1 7 0Z" />
      </g>
    </svg>
  )
}

export function MailSettingIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" {...props}>
      <g fill="none" stroke="currentColor" strokeWidth="1.5">
        <path strokeLinejoin="round" d="m2 5l6.913 3.925c2.526 1.433 3.648 1.433 6.174 0L22 5" />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M11 19.49s-.93.024-1.9 0c-3.15-.08-4.724-.12-5.855-1.257s-1.164-2.672-1.23-5.742a69 69 0 0 1 0-2.956c.066-3.07.099-4.605 1.23-5.742c1.131-1.138 2.706-1.177 5.854-1.256c1.94-.05 3.862-.05 5.803 0c3.149.079 4.723.118 5.854 1.256s1.164 2.672 1.23 5.742c.007.357.012.977.014 1.478"
        />
        <path
          strokeLinecap="round"
          d="M18 20.214V21.5m0-1.286a3.36 3.36 0 0 1-2.774-1.43M18 20.213a3.36 3.36 0 0 0 2.774-1.43M18 13.785c1.157 0 2.176.568 2.774 1.43M18 13.787a3.36 3.36 0 0 0-2.774 1.43M18 13.787V12.5m4 1.929l-1.226.788M14 19.57l1.226-.788M14 14.43l1.226.788M22 19.57l-1.226-.788m0-3.566a3.12 3.12 0 0 1 0 3.566m-5.548-3.566a3.12 3.12 0 0 0 0 3.566"
        />
      </g>
    </svg>
  )
}

export function AnalyticsIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" {...props}>
      <g fill="none" stroke="currentColor" strokeWidth="1.5">
        <path strokeLinecap="round" d="M7 17v-4m5 4V7m5 10v-6" />
        <path
          strokeLinejoin="round"
          d="M2.5 12c0-4.478 0-6.718 1.391-8.109S7.521 2.5 12 2.5c4.478 0 6.718 0 8.109 1.391S21.5 7.521 21.5 12c0 4.478 0 6.718-1.391 8.109S16.479 21.5 12 21.5c-4.478 0-6.718 0-8.109-1.391S2.5 16.479 2.5 12Z"
        />
      </g>
    </svg>
  )
}

export function TranslationIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" {...props}>
      <g fill="none" stroke="currentColor" strokeWidth="1.5">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M5 5.966h3.15m3.85 0h-1.75m-2.1 0h2.1m-2.1 0V5m2.1.966c-.37 1.32-1.142 2.568-2.025 3.665M5.975 12c.713-.656 1.52-1.46 2.25-2.369m0 0c-.45-.528-1.08-1.381-1.26-1.767m1.26 1.767l1.35 1.403"
        />
        <path d="M7.022 16.978c.055 1.72.242 2.775.886 3.56a4 4 0 0 0 .554.554C9.57 22 11.212 22 14.5 22s4.931 0 6.038-.908q.304-.25.554-.554C22 19.43 22 17.788 22 14.5c0-3.287 0-4.931-.908-6.038a4 4 0 0 0-.554-.554c-.782-.641-1.831-.83-3.538-.885m-9.978 9.955c-1.72-.055-2.775-.242-3.56-.886a4 4 0 0 1-.554-.554C2 14.43 2 12.788 2 9.5c0-3.287 0-4.931.908-6.038a4 4 0 0 1 .554-.554C4.57 2 6.212 2 9.5 2c3.287 0 4.931 0 6.038.908a4 4 0 0 1 .554.554c.644.785.831 1.84.886 3.56l.022.001m-9.978 9.955L17 7.023" />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="m13 19l.833-2M18 19l-.833-2m-3.334 0l1.667-4l1.667 4m-3.334 0h3.334"
        />
      </g>
    </svg>
  )
}

export function SecurityLockIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" {...props}>
      <g
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
      >
        <path d="M18.709 3.495C16.817 2.554 14.5 2 12 2s-4.816.554-6.709 1.495c-.928.462-1.392.693-1.841 1.419S3 6.342 3 7.748v3.49c0 5.683 4.542 8.842 7.173 10.196c.734.377 1.1.566 1.827.566s1.093-.189 1.827-.566C16.457 20.08 21 16.92 21 11.237V7.748c0-1.406 0-2.108-.45-2.834s-.913-.957-1.841-1.419" />
        <path d="M10 10V8.5a2 2 0 1 1 4 0V10m0 0h-4a1.5 1.5 0 0 0-1.5 1.5V13a1.5 1.5 0 0 0 1.5 1.5h4a1.5 1.5 0 0 0 1.5-1.5v-1.5A1.5 1.5 0 0 0 14 10" />
      </g>
    </svg>
  )
}

export function MessageNotificationIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" {...props}>
      <g fill="none" stroke="currentColor" strokeWidth="1.5">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M21.96 10.97c.053.83.053 1.69 0 2.52c-.274 4.243-3.606 7.623-7.79 7.9a33 33 0 0 1-4.34 0a4.9 4.9 0 0 1-1.486-.339c-.512-.21-.768-.316-.899-.3c-.13.016-.319.155-.696.434c-.666.49-1.505.844-2.75.813c-.629-.015-.943-.023-1.084-.263s.034-.572.385-1.237c.487-.922.795-1.978.328-2.823c-.805-1.208-1.488-2.639-1.588-4.184a20 20 0 0 1 0-2.52c.274-4.243 3.606-7.622 7.79-7.9c1.202-.08 1.451-.092 2.67-.037M8.5 15h7m-7-5H12"
        />
        <path d="M22 5.5a3.5 3.5 0 1 1-7 0a3.5 3.5 0 0 1 7 0Z" />
      </g>
    </svg>
  )
}

export function LicenseDraftIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" {...props}>
      <g fill="none" stroke="currentColor" strokeWidth="1.5">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M19.75 11v-1c0-3.771 0-5.657-1.171-6.828S15.52 2 11.75 2h-1C6.98 2 5.093 2 3.922 3.172S2.75 6.229 2.75 10v4c0 3.771 0 5.657 1.172 6.828S6.979 22 10.75 22"
        />
        <path strokeLinecap="round" d="M7.25 7h8m-8 5h8" />
        <path
          strokeLinejoin="round"
          d="M13.25 20.827V22h1.174c.409 0 .614 0 .798-.076s.329-.221.618-.51l4.824-4.825c.273-.273.41-.41.482-.556c.139-.28.139-.61 0-.89c-.073-.147-.21-.283-.482-.556c-.274-.273-.41-.41-.557-.483a1 1 0 0 0-.89 0c-.147.073-.284.21-.556.483l-4.824 4.824c-.29.289-.434.434-.51.618s-.077.388-.077.798Z"
        />
      </g>
    </svg>
  )
}

export function PlusSignIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" {...props}>
      <path
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
        d="M12 4v16m8-8H4"
      />
    </svg>
  )
}

export function HelpSquareIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" {...props}>
      <g fill="none" stroke="currentColor">
        <path
          strokeWidth="1.5"
          d="M2.5 12c0-4.478 0-6.718 1.391-8.109S7.521 2.5 12 2.5c4.478 0 6.718 0 8.109 1.391S21.5 7.521 21.5 12c0 4.478 0 6.718-1.391 8.109S16.479 21.5 12 21.5c-4.478 0-6.718 0-8.109-1.391S2.5 16.479 2.5 12Z"
        />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
          d="M9.5 9.5a2.5 2.5 0 1 1 3.912 2.064C12.728 12.032 12 12.672 12 13.5"
        />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M12 17h.009" />
      </g>
    </svg>
  )
}

export function ArrowMoveDownRightIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" {...props}>
      <g
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
      >
        <path d="M4 3v2.077c0 2 0 3.001.145 3.838c.8 4.609 4.762 8.223 9.812 8.952C14.875 18 16.807 18 19 18" />
        <path d="M17 21c.607-.59 3-2.16 3-3s-2.393-2.41-3-3" />
      </g>
    </svg>
  )
}

export function ArrowRightIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" {...props}>
      <path
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
        d="M20 12H4m11 5s5-3.682 5-5s-5-5-5-5"
      />
    </svg>
  )
}

export function ArrowLeftIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" {...props}>
      <path
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
        d="M4 12h16M9 17s-5-3.682-5-5s5-5 5-5"
      />
    </svg>
  )
}

export function ArrowUpIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" {...props}>
      <path
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
        d="M12 5.5V19m6-8s-4.419-6-6-6s-6 6-6 6"
      />
    </svg>
  )
}

export function ArrowDownIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" {...props}>
      <path
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
        d="M12 18.502v-13.5m6 8s-4.419 6-6 6s-6-6-6-6"
      />
    </svg>
  )
}

export function LogoutSquareIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" {...props}>
      <path
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
        d="M14.5 6c-.047-1.093-.185-1.79-.598-2.326a3 3 0 0 0-.554-.554c-.81-.62-1.985-.62-4.335-.62h-.501c-2.834 0-4.251 0-5.132.879c-.88.878-.88 2.293-.88 5.121v7c0 2.828 0 4.243.88 5.121s2.298.879 5.132.879h.5c2.351 0 3.526 0 4.336-.62q.314-.241.554-.554c.413-.536.551-1.233.598-2.326m6-6h-12m9.5 3.5s3.5-2.578 3.5-3.5S18 8.5 18 8.5"
      />
    </svg>
  )
}

export function User03Icon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" {...props}>
      <g fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M16 7a4 4 0 1 1-8 0a4 4 0 0 1 8 0Z" />
        <path
          strokeLinejoin="round"
          d="M14 14h-4a5 5 0 0 0-5 5a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2a5 5 0 0 0-5-5Z"
        />
      </g>
    </svg>
  )
}

export const ChartIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <line x1="18" y1="20" x2="18" y2="10" />
    <line x1="12" y1="20" x2="12" y2="4" />
    <line x1="6" y1="20" x2="6" y2="14" />
  </svg>
)

export const UserGroupIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
)

export const EyeIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
)

export const ClockIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <circle cx="12" cy="12" r="10" />
    <polyline points="12 6 12 12 16 14" />
  </svg>
)

export function BackupIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" {...props}>
      <g fill="none" stroke="currentColor" strokeWidth="1.5">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M3 10v6a7 7 0 0 0 7 7h4a7 7 0 0 0 7-7v-6"
        />
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 2v12m0 0l-3-3m3 3l3-3" />
      </g>
    </svg>
  )
}

export function ActivityLogIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" {...props}>
      <g fill="none" stroke="currentColor" strokeWidth="1.5">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M9 12h6m-6 4h6m2 5H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5.586a1 1 0 0 1 .707.293l5.414 5.414a1 1 0 0 1 .293.707V19a2 2 0 0 1-2 2Z"
        />
      </g>
    </svg>
  )
}

export function FingerPrintScanIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" {...props}>
      <g
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
      >
        <path d="M2.5 8.187c.104-2.1.415-3.41 1.347-4.34c.93-.932 2.24-1.243 4.34-1.347M21.5 8.187c-.104-2.1-.415-3.41-1.347-4.34c-.93-.932-2.24-1.243-4.34-1.347m0 19c2.1-.104 3.41-.415 4.34-1.347c.932-.93 1.243-2.24 1.347-4.34M8.187 21.5c-2.1-.104-3.41-.415-4.34-1.347c-.932-.93-1.243-2.24-1.347-4.34m14-.313V11a4.5 4.5 0 1 0-9 0v4.5" />
        <path d="M13.5 12.5V11a1.5 1.5 0 0 0-3 0v5.5m3-1v2" />
      </g>
    </svg>
  )
}

export function ThirdBracketIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" {...props}>
      <g
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
      >
        <path d="M14 16c.924 0 1.673-.512 1.673-1.143c0-1.22.014-1.723 1.082-2.453c.327-.223.327-.585 0-.808c-1.068-.73-1.082-1.232-1.082-2.453C15.673 8.512 14.924 8 14 8m-4 8c-.924 0-1.673-.512-1.673-1.143c0-1.22-.014-1.723-1.082-2.453c-.327-.223-.327-.585 0-.808c1.068-.73 1.082-1.232 1.082-2.453C8.327 8.512 9.076 8 10 8" />
        <path d="M2.5 12c0-4.478 0-6.718 1.391-8.109S7.521 2.5 12 2.5c4.478 0 6.718 0 8.109 1.391S21.5 7.521 21.5 12c0 4.478 0 6.718-1.391 8.109S16.479 21.5 12 21.5c-4.478 0-6.718 0-8.109-1.391S2.5 16.479 2.5 12" />
      </g>
    </svg>
  )
}

export function ParagraphIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" {...props}>
      <path
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
        d="M15 3v18m0-18h-5m5 0h6m-11 9H7.5a4.5 4.5 0 0 1 0-9H10m0 9V3m0 9v9"
      />
    </svg>
  )
}

export function TextIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" {...props}>
      <g fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth="1.5">
        <path strokeLinejoin="round" d="M15 21.001H9" />
        <path d="M12 3v18m0-18c1.387 0 3.17.03 4.588.176c.6.062.9.093 1.166.202a2.05 2.05 0 0 1 1.165 1.299C19 4.954 19 5.27 19 5.902M12 3c-1.387 0-3.17.03-4.588.176c-.6.062-.9.093-1.166.202A2.05 2.05 0 0 0 5.08 4.677C5 4.954 5 5.27 5 5.902" />
      </g>
    </svg>
  )
}

export function SelectIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" {...props}>
      <g fill="none" stroke="currentColor" strokeWidth="1.5">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M5 2v6M2 5h6m12 13V7M7 20h11m0-15h-6m-7 7v6"
        />
        <path d="M18 5c0-.943 0-1.414.293-1.707S19.057 3 20 3s1.414 0 1.707.293S22 4.057 22 5s0 1.414-.293 1.707S20.943 7 20 7s-1.414 0-1.707-.293S18 5.943 18 5Zm0 15c0-.943 0-1.414.293-1.707S19.057 18 20 18s1.414 0 1.707.293S22 19.057 22 20s0 1.414-.293 1.707S20.943 22 20 22s-1.414 0-1.707-.293S18 20.943 18 20ZM3 20c0-.943 0-1.414.293-1.707S4.057 18 5 18s1.414 0 1.707.293S7 19.057 7 20s0 1.414-.293 1.707S5.943 22 5 22s-1.414 0-1.707-.293S3 20.943 3 20Z" />
      </g>
    </svg>
  )
}

export function CalendarIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" {...props}>
      <g
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
      >
        <path d="M16 2v4M8 2v4m5-2h-2C7.229 4 5.343 4 4.172 5.172S3 8.229 3 12v2c0 3.771 0 5.657 1.172 6.828S7.229 22 11 22h2c3.771 0 5.657 0 6.828-1.172S21 17.771 21 14v-2c0-3.771 0-5.657-1.172-6.828S16.771 4 13 4M3 10h18" />
        <path d="M10 18.5v-4.653c0-.191-.137-.347-.305-.347H9m5 4.998l1.486-4.606a.3.3 0 0 0-.286-.392H13" />
      </g>
    </svg>
  )
}

export function AtIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" {...props}>
      <path
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeWidth="1.5"
        d="M15.6 8.4v4.5a2.7 2.7 0 1 0 5.4 0V12a9 9 0 1 0-3.6 7.2M15.6 12a3.6 3.6 0 1 1-7.2 0a3.6 3.6 0 0 1 7.2 0Z"
      />
    </svg>
  )
}

export function ArrangeByNumbersIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" {...props}>
      <path
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
        d="M7 10V3.95c0-.575 0-.862-.23-.933C6.263 2.859 5.5 4 5.5 4M7 10H5.5M7 10h1.5m.5 7.5v-1.75c0-.825 0-1.237-.293-1.494S7.943 14 7 14s-1.414 0-1.707.256C5 14.513 5 14.925 5 15.75s0 1.237.293 1.494s.764.256 1.707.256zm0 0v.875c0 1.237 0 1.856-.44 2.24C8.122 21 7.415 21 6 21H5m11.5-1V4m0 16c-.7 0-2.008-1.994-2.5-2.5m2.5 2.5c.7 0 2.009-1.994 2.5-2.5"
      />
    </svg>
  )
}

export function FolderAddIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" {...props}>
      <g fill="none" stroke="currentColor" stroke-linecap="round" stroke-width="1.5">
        <path d="M13 21h-1c-4.714 0-7.071 0-8.536-1.465C2 18.072 2 15.715 2 11V7.944c0-1.816 0-2.724.38-3.406A3 3 0 0 1 3.538 3.38C4.22 3 5.128 3 6.944 3C8.108 3 8.69 3 9.2 3.191c1.163.436 1.643 1.493 2.168 2.542L12 7M8 7h8.75c2.107 0 3.16 0 3.917.506a3 3 0 0 1 .827.827C21.98 9.06 22 10.06 22 12" />
        <path stroke-linejoin="round" d="M18 13v8m4-4h-8" />
      </g>
    </svg>
  )
}
