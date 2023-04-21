import { useEffect, useState } from 'react';

import { connect } from 'react-redux';

import { getReceipts, postReceipt, delReceipt, resetOn } from '@/actions/receipt';

import { Button, Form, Table, message, Upload, Popconfirm } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { InboxOutlined, DeleteFilled } from '@ant-design/icons';

const { Dragger } = Upload;

interface ReceiptDataType {
    id: string;
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
        delReceiptLoading, delReceiptSuccess, delReceiptFailed, onDelReceipt,
        onReset
    } = props;

    const [data, setData] = useState([]);

    const columns: ColumnsType<ReceiptDataType> = [
        {
            title: 'Date',
            dataIndex: 'date',
            key: 'date',
            render: (text) => <div>{text}</div>,
        },
        {
            title: 'Vendor',
            dataIndex: 'vendor',
            key: 'vendor',
            render: (text) => <div>{text}</div>,
        },
        {
            title: 'Amount',
            dataIndex: 'amount',
            key: 'amount',
            render: (text) => <div>{text}</div>,
        },
        {
            title: 'Tax',
            dataIndex: 'tax',
            key: 'tax',
            render: (text) => <div>{text}</div>,
        },
        {
            title: 'Currency',
            dataIndex: 'currency',
            key: 'currency',
            render: (text) => <div>{text}</div>,
        },
        {
            title: 'Description',
            dataIndex: 'description',
            key: 'description',
            render: (text) => <div>{text}</div>,
        },
        {
            title: 'Action',
            dataIndex: 'id',
            key: '',
            render: (val) =>
                <Popconfirm
                    title="Delete Data"
                    description="Are you sure?"
                    onConfirm={() => confirmDelete(val)}
                    onCancel={cancel}
                    okText="Yes"
                    cancelText="No"
                >
                    <DeleteFilled />
                </Popconfirm>
        },

    ];

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

    const confirmDelete = async (id: Number) => {
        await onDelReceipt(id)
    };

    const cancel = () => { };

    useEffect(() => {
        if (delReceiptSuccess) {
            getData()
            message.success('Data Deletion Successful!')
        }

        if (delReceiptFailed) {
            message.error('Data Deletion Failed!')
        }
        onReset();
    }, [delReceiptSuccess, delReceiptFailed])

    const isLoading = receiptsLoading || postReceiptLoading || delReceiptLoading;

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
        onDelReceipt: (id: number) => dispatch(delReceipt(id)),
        onReset: () => dispatch(resetOn())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ReceiptsPage);
