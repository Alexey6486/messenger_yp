export default `
<div class="field{{#if class}} {{class}}{{/if}}" id="{{id}}">
<label for="{{id_label}}" class="{{#if input_data.value.length}}visible{{/if}}">
{{label}}
<span>{{#if isRequired}}*{{/if}}</span>
</label>
{{{ markup.input }}}
<span>{{input_data.error}}</span>
</div>
`;
