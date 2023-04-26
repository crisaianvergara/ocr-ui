import { useEffect, useState } from 'react';

import { connect } from 'react-redux';

import { getReceipts, postReceipt, putReceipt, delReceipt, resetOn } from '@/actions/receipt';

import { Button, Form, Table, message, Upload, Popconfirm, Input } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { InboxOutlined, DeleteFilled, EditFilled, SaveFilled } from '@ant-design/icons';

const { Dragger } = Upload;

interface ReceiptDataType {
    id: number;
    date: string;
    vendor: string;
    amount: number;
    tax: number;
    currency: string;
    description: string;
}

const ReceiptsPage = (props: any) => {
    const {
        receiptsLoading, receiptsSuccess, receiptsFailed, receiptsData, onGetReceipts,
        postReceiptLoading, postReceiptSuccess, postReceiptFailed, onPostReceipt,
        putReceiptLoading, putReceiptSuccess, putReceiptFailed, onPutReceipt,
        delReceiptLoading, delReceiptSuccess, delReceiptFailed, onDelReceipt,
        onReset
    } = props;

    const [data, setData] = useState([]);

    const getData = async () => {
        await onGetReceipts();
    };

    useEffect(() => {
        getData();
    }, []);

    useEffect(() => {
        if (receiptsSuccess) {
            setData(receiptsData);
        };

        if (receiptsFailed) {
            console.log('Get receipts data failed!');
        };
    }, [receiptsSuccess, receiptsFailed, receiptsData]);

    const [file, setFile]: any = useState(null);
    const [uploading, setUploading] = useState(false);

    const handleUpload = async () => {
        const formData = new FormData();
        formData.append("image", file);
        setUploading(true);
        setFile(null);
        try {
            await onPostReceipt(formData);
        } catch (error) {
            message.error("Error during upload!");
        }
        setUploading(false);
    };

    useEffect(() => {
        if (postReceiptSuccess) {
            getData()
            message.success('Receipt scanned successfully!')
        }

        if (postReceiptFailed) {
            message.error('Error during upload!')
        }
        onReset();
    }, [postReceiptSuccess, postReceiptFailed])

    const confirmDelete = async (id: number) => {
        await onDelReceipt(id)
    };

    const cancel = () => { };

    useEffect(() => {
        if (delReceiptSuccess) {
            getData()
            message.success('Data Deletion Successful!');
        }

        if (delReceiptFailed) {
            message.error('Data Deletion Failed!');
        }
        onReset();
    }, [delReceiptSuccess, delReceiptFailed])

    const [date, setDate] = useState('');
    const [vendor, setVendor] = useState('');
    const [amount, setAmount] = useState('');
    const [tax, setTax] = useState('');
    const [currency, setCurrency] = useState('');
    const [description, setDescription] = useState('');

    const [edit, setEdit] = useState(0);

    const handleEditSubmit = (id: number) => {
        setEdit(id);
        for (let i = 0; i < receiptsData.length; i++)
            if (id === receiptsData[i].id) {
                setDate(receiptsData[i].date)
                setVendor(receiptsData[i].vendor)
                setAmount(receiptsData[i].amount)
                setTax(receiptsData[i].tax)
                setCurrency(receiptsData[i].currency)
                setDescription(receiptsData[i].description)
            }
    };

    const handleSaveSubmit = async (id: number) => {
        const data = {
            date: date,
            vendor: vendor,
            amount: amount,
            tax: tax,
            currency: currency,
            description: description,
        };
        await onPutReceipt(id, data);
        setEdit(0);
        await onReset();
    };

    useEffect(() => {
        if (putReceiptSuccess) {
            message.success('Receipt updated successfully!');
            getData();
        }
        if (putReceiptFailed) {
            message.error('Receipt updated failed!');
            getData();
        }
    }, [putReceiptSuccess, putReceiptFailed]);

    const isLoading = receiptsLoading || postReceiptLoading || putReceiptLoading || delReceiptLoading;

    const columns: ColumnsType<ReceiptDataType> = [
        {
            title: 'Date',
            dataIndex: 'date',
            key: 'date',
            width: 300,
            render: (text, record) =>
                <>
                    {
                        edit === record.id ? <Input value={date} onChange={(e) => setDate(e.target.value)} /> : <div>{text}</div>
                    }
                </>
        },
        {
            title: 'Vendor',
            dataIndex: 'vendor',
            key: 'vendor',
            width: 300,
            render: (text, record) =>
                <>
                    {
                        edit === record.id ? <Input value={vendor} onChange={(e) => setVendor(e.target.value)} /> : <div>{text}</div>
                    }
                </>
        },
        {
            title: 'Amount',
            dataIndex: 'amount',
            key: 'amount',
            width: 300,
            render: (text, record) =>
                <>
                    {
                        edit === record.id ? <Input value={amount} onChange={(e) => setAmount(e.target.value)} /> : <div>{text}</div>
                    }
                </>
        },
        {
            title: 'Tax',
            dataIndex: 'tax',
            key: 'tax',
            width: 300,
            render: (text, record) =>
                <>
                    {
                        edit === record.id ? <Input value={tax} onChange={(e) => setTax(e.target.value)} /> : <div>{text}</div>
                    }
                </>
        },
        {
            title: 'Currency',
            dataIndex: 'currency',
            key: 'currency',
            width: 300,
            render: (text, record) =>
                <>
                    {
                        edit === record.id ? <Input value={currency} onChange={(e) => setCurrency(e.target.value)} /> : <div>{text}</div>
                    }
                </>
        },
        {
            title: 'Description',
            dataIndex: 'description',
            key: 'description',
            width: 300,
            render: (text, record) =>
                <>
                    {
                        edit === record.id ? <Input value={description} onChange={(e) => setDescription(e.target.value)} /> : <div>{text}</div>
                    }
                </>
        },
        {
            title: 'Action',
            dataIndex: 'id',
            key: '',
            width: 300,
            render: (val) =>
                <>
                    {
                        edit === val ? <Button style={{ padding: "0" }} onClick={() => { handleSaveSubmit(val) }} type='link'> <SaveFilled /> </Button> : <Button style={{ padding: "0" }} type='link' onClick={() => { handleEditSubmit(val) }}> <EditFilled /> </Button>
                    }
                    <Popconfirm
                        title="Delete Data"
                        description="Are you sure?"
                        onConfirm={() => confirmDelete(val)}
                        onCancel={cancel}
                        okText="Yes"
                        cancelText="No"
                    >
                        <Button style={{ padding: "0" }} type='link' danger><DeleteFilled /></Button>
                    </Popconfirm>
                </>
        },

    ];

    return (
        <div>
            <Form>
                <Form.Item>
                    <Dragger
                        beforeUpload={(file) => {
                            setFile(file);
                            return false;
                        }}
                    >
                        <p className="ant-upload-drag-icon"><InboxOutlined /></p>
                        <p className="ant-upload-text">Click or drag file to this area to upload.</p>
                        <p className="ant-upload-hint">Support for a single upload.</p>
                    </Dragger>
                </Form.Item>
                <Form.Item>
                    <Button
                        type="primary"
                        htmlType="submit"
                        onClick={handleUpload}
                        disabled={!file || uploading}
                    >
                        Scan Receipt
                    </Button>
                </Form.Item>
            </Form>
            <Table
                columns={columns}
                dataSource={data}
                loading={isLoading}
                pagination={{
                    pageSize: 20
                }}
                size='small'
                rowKey='id'
            />
        </div>
    );
};

function mapStateToProps(state: any) {
    return {
        receiptsLoading: state.receipt.receiptsLoading,
        receiptsSuccess: state.receipt.receiptsSuccess,
        receiptsFailed: state.receipt.receiptsFailed,
        receiptsData: state.receipt.receiptsData,

        postReceiptLoading: state.receipt.postReceiptLoading,
        postReceiptSuccess: state.receipt.postReceiptSuccess,
        postReceiptFailed: state.receipt.postReceiptFailed,
        postReceiptData: state.receipt.postReceiptData,

        putReceiptLoading: state.receipt.putReceiptLoading,
        putReceiptSuccess: state.receipt.putReceiptSuccess,
        putReceiptFailed: state.receipt.putReceiptFailed,
        putReceiptData: state.receipt.putReceiptData,

        delReceiptLoading: state.receipt.delReceiptLoading,
        delReceiptSuccess: state.receipt.delReceiptSuccess,
        delReceiptFailed: state.receipt.delReceiptFailed,
        delReceiptData: state.receipt.delReceiptData,
    };
};

function mapDispatchToProps(dispatch: any) {
    return {
        onGetReceipts: () => dispatch(getReceipts()),
        onPostReceipt: (data: object) => dispatch(postReceipt(data)),
        onPutReceipt: (id: number, data: object) => dispatch(putReceipt(id, data)),
        onDelReceipt: (id: number) => dispatch(delReceipt(id)),
        onReset: () => dispatch(resetOn())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ReceiptsPage);
