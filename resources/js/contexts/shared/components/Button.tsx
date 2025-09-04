import { LoadingIcon } from "./Icons"

interface Props {
	title: string,
	loading?: boolean,
	icon?: JSX.Element,
	onClick: () => void
}

export const ButtonPrimary = ({title, icon, loading, onClick}: Props) => {
	return (
		<button type="button" disabled={loading} title={title} onClick={onClick} className="inline-block flex items-center gap-2 px-8 py-2 mr-2 text-xs font-bold text-center text-white uppercase align-middle transition-all border-0 rounded-lg cursor-pointer ease-soft-in leading-pro tracking-tight-soft bg-gradient-to-tl from-purple-700 to-pink-500 shadow-soft-md bg-150 bg-x-25 hover:scale-102 active:opacity-85 disabled:opacity-25">
			{ icon && <span>{loading ? <LoadingIcon /> : icon}</span> }
			<span>{title}</span>
		</button>
	)
}

export const ButtonSecondary = ({title, icon, loading, onClick}: Props) => {
	return (
		<button type="button" disabled={loading} title={title} onClick={onClick} className="inline-block flex items-center gap-1 px-8 py-2 font-bold text-center uppercase align-middle transition-all bg-transparent border border-solid rounded-lg shadow-none cursor-pointer active:opacity-85 disabled:opacity-25 leading-pro text-xs ease-soft-in tracking-tight-soft bg-150 bg-x-25 hover:scale-102 active:shadow-soft-xs border-slate-700 text-slate-700 hover:text-slate-700 hover:opacity-75 hover:shadow-none active:scale-100 active:border-slate-700 active:bg-slate-700 active:text-white hover:active:border-slate-700 hover:active:text-slate-700 hover:active:opacity-75">
			{ icon && <span>{loading ? <LoadingIcon /> : icon}</span> }
			<span>{title}</span>
		</button>
	)
}