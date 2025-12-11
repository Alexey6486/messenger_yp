export default `
<footer class="{{class.footer}}">
{{{ markup.messaging-footer-drop-down }}}
<form id="{{ids.form}}" class="{{class.message-form}}">
<input id="message-input" name="message" class="{{class.message-input}}" type="text" value="{{message}}" placeholder="Сообщение" />
{{{ markup.main-send-message-button }}}
</form>
</footer>
`;
