export default `
<div class="field{{#if class}} {{class}}{{/if}}" id="{{id}}">
<label for="{{id_label}}" class="{{#if value.length}}visible{{/if}}">{{label}}</label>
{{{ markup.input }}}
<span>{{error}}</span>
</div>
`;
