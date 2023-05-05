// React-quill
import ReactQuill from "react-quill";
import 'react-quill/dist/quill.snow.css'

// React-quill config
const modules = {
    toolbar: [
        [{ 'header': [1, 2, false] }],
        ['bold', 'italic', 'underline','strike', 'blockquote'],
        [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
        ['link', 'image'],
        ['clean']
    ],
}

const formats = [
    'header', 'bold', 'italic', 'underline', 'strike', 'blockquote', 'list', 'bullet', 'indent', 'link', 'image', 'font'
];
const Editor = ({content, setContent}) => {
    return <div>
        <ReactQuill modules={modules} formats={formats} value={content} onChange={(newContent) => setContent(newContent)}/>
    </div>
}

export default Editor;