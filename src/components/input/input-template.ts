export default `
<input
id="{{id}}"
name="{{name}}"
class="{{class}}"
type="{{type}}"
accept="{{accept}}"
placeholder="{{placeholder}}"
value="{{input_data.value}}"
data-input="{{dataset}}"
{{#if isDisabled}}disabled{{/if}}
>
`;
