import { useEffect, useState } from 'react';

import { connect } from 'react-redux';

import { getUsers, resetOn } from '@/actions/user';

import { mmDdYyFormat } from '@/utils/date';

import { Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';

interface UserDataType {
    id: string;
    first_name: string;
    last_name: string;
    is_active: number;
    date_joined: string;
    email: string;
}

const UsersPage = (props: any) => {
    const {
        usersLoading, usersSuccess, usersFailed, usersData, onGetUsers,
        onReset
    } = props;

    const [data, setData] = useState([]);

    const columns: ColumnsType<UserDataType> = [
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
            render: (text) => <div>{text}</div>,
        },
        {
            title: 'First Name',
            dataIndex: 'first_name',
            key: 'first_name',
            render: (text) => <div>{text}</div>,
        },
        {
            title: 'Last Name',
            dataIndex: 'last_name',
            key: 'last_name',
            render: (text) => <div>{text}</div>,
        },
        {
            title: 'Date Joined',
            dataIndex: 'date_joined',
            key: 'date_joined',
            render: (text) => <div>{mmDdYyFormat(text)}</div>,
        },
        {
            title: 'Status',
            dataIndex: 'is_active',
            key: 'is_active',
            render: (text) => <div>{text ? 'Active' : 'Inactive'}</div>,
        },
    ];

    const getData = async () => {
        await onGetUsers();
    };

    useEffect(() => {
        getData();
    }, []);

    useEffect(() => {
        if (usersSuccess) {
            setData(usersData);
        };

        if (usersFailed) {
            console.log('Get users data failed!');
        };
    }, [usersSuccess, usersFailed, usersData]);

    const isLoading = usersLoading;

    return (
        <div>
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
        usersLoading: state.user.usersLoading,
        usersSuccess: state.user.usersSuccess,
        usersFailed: state.user.usersFailed,
        usersData: state.user.usersData,
    };
};

function mapDispatchToProps(dispatch: any) {
    return {
        onGetUsers: () => dispatch(getUsers()),
        onReset: () => dispatch(resetOn())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UsersPage);
