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
            console.log('mode add carr');
            break;
        case MODE.ADDMAJOR:
            console.log('mode add major');
            break;
        case MODE.ADDSUBJECT:
            console.log('mode add subje');
            break;
        case MODE.EDITCARRER:
            console.log('mode edit carr');
            break;
        case MODE.EDITMAJOR:
            console.log('mode edit carr');
            break;
        case MODE.EDITSUBJECT:
            console.log('mode add carr');
            break;
    }

    return (
        <div>FormMajorRef</div>
    )
}

export default FormMajorRef