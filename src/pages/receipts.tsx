import { useEffect, useState } from 'react';

import { connect } from 'react-redux';

import { getReceipts, resetOn } from '@/actions/receipt';

import { Button, Form, Table, message, Upload, Popconfirm } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { InboxOutlined, DeleteFilled, EditFilled } from '@ant-design/icons';

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

    const isLoading = receiptsLoading;

    return (
        <div>
            <Form>
                <Form.Item>
                    <Dragger>
                        <p className="ant-upload-drag-icon"><InboxOutlined /></p>
                        <p className="ant-upload-text">Click or drag file to this area to upload.</p>
                        <p className="ant-upload-hint">Support for a single upload.</p>
                    </Dragger>
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit">Scan Receipt</Button>
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
    };
};

function mapDispatchToProps(dispatch: any) {
    return {
        onGetReceipts: () => dispatch(getReceipts()),
        onReset: () => dispatch(resetOn())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ReceiptsPage);
