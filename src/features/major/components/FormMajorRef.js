import React from 'react'

const MODE = {
    ADDCARRER: 'ADDCARRER', /* Thêm ngành (Công nghệ thông tin) */
    EDITCARRER: 'EDITCARRER',
    ADDMAJOR: 'ADDMAJOR', /* Thêm chuyên ngành (Thiết kế Website) */
    EDITMAJOR: 'EDITMAJOR',
    ADDSUBJECT: 'ADDSUBJECT',  /*Thêm môn học (NodeJs - ReactJs) */
    EDITSUBJECT: 'EDITSUBJECT',
}

const FormMajorRef = (props, ref) => {
    const [visible, setVisible] = React.useState(false);
    const [title, setTitle] = React.useState('');
    const [formCarrer] = Form.useForm();
    const [mode, setMode] = React.useState(MODE.ADDCARRER)

    useImperativeHandle(ref, () => ({
        show: (caseForm, data) => {
            setVisible(true);
            if (caseForm === MODE.ADDCARRER) {
                setTitle('Thêm ngành học');
                setMode(MODE.ADDCARRER)
            } else if (caseForm === MODE.EDITCARRER) {
                setTitle('Sửa tên ngành học')
                setMode(MODE.EDITCARRER)
            } else if (caseForm === MODE.ADDMAJOR) {
                setTitle('Thêm chuyên ngành')
                setMode(MODE.ADDMAJOR)
            } else if (caseForm === MODE.EDITCARRER) {
                setTitle('Sửa tên chuyên ngành')
                setMode(MODE.EDITCARRER)
            } else if (caseForm === MODE.ADDSUBJECT) {
                setTitle('Thêm môn học')
                setMode(MODE.ADDSUBJECT)
            } else if (caseForm === MODE.EDITSUBJECT) {
                setTitle('Thêm môn học')
                setMode(MODE.EDITSUBJECT)
            }
        },
        hide: () => {
            setVisible(false)
        }
    }))

    switch (mode) {
        case MODE.ADDCARRER:
            break;
        case MODE.ADDMAJOR:
            break;
        case MODE.ADDSUBJECT:
            break;
        case MODE.EDITCARRER:
            break;
        case MODE.EDITMAJOR:
            break;
        case MODE.EDITSUBJECT:
            break;
    }

    return (
        <div>FormMajorRef</div>
    )
}

export default FormMajorRef