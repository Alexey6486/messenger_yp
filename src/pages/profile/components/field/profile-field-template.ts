export default `
<div class="{{styles.profile-field}}">
<div class="{{styles.field-name}}">{{fieldName}}</div>
<div class="{{styles.field-data}}">
{{{ markup.input }}}
</div>
<span class="{{styles.error-data}}">{{input_data.error}}</span>
</div>
`;
