export default `
<div class="{{styles.buttons}}">
{{#if isVisible}}
<div class="{{styles.buttons-center}}">
{{{ markup.profile-save-password-button }}}
</div>
{{/if}}
</div>

`;
