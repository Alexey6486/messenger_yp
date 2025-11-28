export default `
<div class="">
{{>
Field
    id="add-user"
    placeholder="Логин"
    type="text"
    label="Логин"
    error=state.form.errors.login
    value=state.form.fields.login
    dataset="login"
    name="login"
}}
</div>
`;
