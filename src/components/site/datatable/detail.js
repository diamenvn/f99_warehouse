
import React, {
    useState, useEffect
} from 'react';
import { AppAPI } from '../../../api/appApi';
import { Drawer, Skeleton, Button, Form, Row, Input, Select, Divider, Steps } from 'antd';
const { Step } = Steps;

function Detail(props) {
    const [loading, setLoading] = useState(true);
    const [note, setNote] = useState("");
    const [step, setStep] = useState(<Step title="Finished" description="This is a description." />);

    const getDetail = (id) => {
        let obj = [];
        AppAPI.getLogData(id).then(res => {
            setLoading(false);
            if (res.data.success) {
                res.data.data.map(item => {
                    obj.push(<Step title={item.customer.name} description={item.note} />);
                });
            }
            setStep(obj);
        })
    }

    useEffect(() => {
        if (!!props.id) {
            getDetail(props.id);
        }
    }, [props.id]);

    const onCreate = values => {
        let params = {
            note: note,
            id: props.id
        };

        AppAPI.createLogData(params).then(res => {
            setLoading(true);
            getDetail(props.id);
        });
    }

    return (
        <Drawer
            title="Thông tin khách hàng"
            placement={'right'}
            closable={false}
            onClose={props.hideDetail}
            visible={props.visibleDetail}
            key={'right'}
            width="600px"
        >
            <Skeleton loading={loading} active />
            <Skeleton loading={loading} active />
            <Skeleton loading={loading} active />
            {!loading && (
                <div>
                    <Input.TextArea value={note} onChange={e => setNote(e.target.value)} placeholder="Nội dung ghi chú" allowClear />
                    <Button onClick={e => onCreate(e)} className="mt-10" type="primary">Lưu</Button>
                    <Divider orientation="left">Lịch sử ghi chú</Divider>
                    <Steps direction="vertical" className="mt-20" current={1}>
                        {step}
                    </Steps>
                </div>
            )}
        </Drawer>
    );
}



export default Detail;