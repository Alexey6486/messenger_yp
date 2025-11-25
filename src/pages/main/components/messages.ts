export default `
<div class="{{class.messages}}">
{{>
    MessagesHeader
        class=(lookup @root.styles)
}}
<div class="{{class.main}}">Сообщения...</div>
{{>
    MessagesFooter
        class=(lookup @root.styles)
}}
</div>
`;
