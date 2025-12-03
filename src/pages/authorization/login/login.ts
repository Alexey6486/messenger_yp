import { Block } from '@/block';

// export const GetLoginPage = (state: IFormState<ILoginForm>) => {
// 	return compile(template, {
// 		styles,
// 		state,
// 		buttonsId: IDS.FBT,
// 		formId: IDS.FLG,
// 		btn_type_auth: PAGES.AUTHORIZATION,
// 		btn_type_reg: PAGES.REGISTRATION,
// 	});
// };

export class Login extends Block {
	constructor(props) {
		super(undefined, {
			...props,
			// FieldName: new Field({
			// 	id: 'login',
			// 	placeholder: 'Логин',
			// 	type: 'text',
			// 	label: 'Логин',
			// 	error: props.errors.login,
			// 	value: props.fields.login,
			// 	dataset: 'login',
			// 	name: 'login',
			// 	onClick: (event: Event) => {
			// 		console.log('CLICK');
			// 		event.preventDefault();
			// 		event.stopPropagation();
			// 	},
			// }),
			// ButtonSubmit: new Button({
			// 	id: IDS.FBT,
			// 	type: 'submit',
			// 	class: styles,
			// 	dataset: PAGES.AUTHORIZATION,
			// 	text: 'Войти',
			// }),
		});
	}

	override render(): string {
		return `
			<div>
				test
<!--				{{{ FieldName }}}-->
<!--				{{{ ButtonSubmit }}}-->
			</div>
		`;
	}
}
