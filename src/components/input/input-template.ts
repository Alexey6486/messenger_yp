export default `
<input
id="{{id}}"
name="{{name}}"
type="{{type}}"
placeholder="{{placeholder}}"
value="{{input_data.value}}"
data-input="{{dataset}}"
{{#if isDisabled}}disabled{{/if}}
>
`;
