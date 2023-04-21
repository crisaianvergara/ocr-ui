import { useEffect, useState } from 'react';

import { connect } from 'react-redux';

import { getReceipts, postReceipts, resetOn } from '@/actions/receipt';

import { Button, Form, Table, message, Upload, Popconfirm } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { InboxOutlined, DeleteFilled, EditFilled } from '@ant-design/icons';
import { postReceiptsDataFulfilled } from '@/reducers/receiptSlice';

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
        postReceiptsLoading, postReceiptsSuccess, postReceiptsFailed, postReceiptsData, onPostReceipts,
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
            dataIndex: 'action',
            key: 'action',
            render: (val) => <>
                <Popconfirm
                    title="Delete Data"
                    description="Are you sure?"
                    okText="Yes"
                    cancelText="No"
                >
                    <DeleteFilled />
                </Popconfirm>
            </>
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
            await onPostReceipts(formData);
        } catch (error) {
            message.error("Error during upload!");
        }
        setUploading(false);
    };

    useEffect(() => {
        if (postReceiptsSuccess) {
            getData()
            message.success('Receipt scanned successfully!')
        }

        if (postReceiptsFailed) {
            message.error('Error during upload!')
        }
        onReset();
    }, [postReceiptsSuccess, postReceiptsFailed])

    const isLoading = receiptsLoading || postReceiptsLoading;

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

        postReceiptsLoading: state.receipt.postReceiptsLoading,
        postReceiptsSuccess: state.receipt.postReceiptsSuccess,
        postReceiptsFailed: state.receipt.postReceiptsFailed,
        postReceiptsData: state.receipt.postReceiptsData,
    };
};

function mapDispatchToProps(dispatch: any) {
    return {
        onGetReceipts: () => dispatch(getReceipts()),
        onPostReceipts: (data: object) => dispatch(postReceipts(data)),
        onReset: () => dispatch(resetOn())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ReceiptsPage);
