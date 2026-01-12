export default `
<div class="{{styles.modal-error}}" id="{{id}}">
<div>
<div>{{ modalError.code }}</div>
<div>{{ modalError.text }}</div>
</div>
{{{markup.modal-error-btn}}}
</div>
`;
