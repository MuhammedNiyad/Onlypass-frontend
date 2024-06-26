/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable prettier/prettier */
import { Form, Select, Table, Tag } from 'antd';
import React from 'react';
import svg2 from '../../../public/svg2-onlypass.svg';
import svg3 from '../../../public/svg3-onlypass.svg';
import svg4 from '../../../public/svg4-onlypass.svg';
import PageHeader from '../components/common_components/PageHeader';
import { Link } from 'react-router-dom';
import { ApiClientPrivate } from '../../utils/axios';
import { useQuery } from 'react-query';

const Customer: React.FC = () => {

  const fetchCustomerData = () => {
    return ApiClientPrivate.get(`/customer/all`);
    // return response;
  };
  const {data:mainData} = useQuery('fetchCustomerData', fetchCustomerData);
 
 
  // console.log({mainData});
  

  const columns = [
    {
      title: () => <div className="font-montserrat text-[#7E7E7E]">Name</div>,
      key: 'name',
      render: (record: any) => <Link to={`/CustomerDetails/${record._id}`}>{record.name}</Link>
    },
    {
      title: () => <div className="font-montserrat text-[#7E7E7E]">Gender</div>,
      dataIndex: 'gender',
      key: 'gender'
    },
    {
      title: () => <div className="font-montserrat text-[#7E7E7E]">Phone No.</div>,
      dataIndex: 'phoneNumber',
      key: 'phoneNumber'
    },
    {
      title: () => <div className="font-montserrat text-[#7E7E7E]">Email</div>,
      dataIndex: 'email',
      key: 'email'
    },
    {
      title: () => <div className="font-montserrat text-[#7E7E7E]">Type</div>,
      // dataIndex: 'type',
      key: 'type',
      render:(record: any) =>{
        const type = record.is_offline === true? "offline": "onlyPass"
        return type
      }
    },

    {
      title: () => <div className="font-montserrat text-[#7E7E7E]">Membership</div>,
      key: 'membership',
      
      render: (membership:any) => {
        // console.log(membership)
        
        const color = membership?.activeMembership.length === 0 ? 'red' : 'green';
        const status = membership?.activeMembership.length === 0 ? 'Inactive' : 'Active';
        return (
          <Tag color={color} key={status}>
            {status.toUpperCase()}
          </Tag>
        );
      }
    }
  ];
  // const dummyCustomer = [
  //   {
  //     key: 1,
  //     name: 'salman',
  //     gender: 'male',
  //     phoneNumber: '7559889699',
  //     email: 'salmanSb0786@gmail.com',
  //     type: 'onlypass',
  //     membership: ['Active']
  //   },
  //   {
  //     key: 2,
  //     name: 'Mohammed Niyad',
  //     gender: 'male',
  //     phoneNumber: '7894561230',
  //     email: 'niyad123@gmail.com',
  //     type: 'onlypass',
  //     membership: ['Inactive']
  //   }
  // ];
  const details = [
    {
      icon: svg4,
      head: 'Total Customer',
      value: '5,423',
      percentage1: '16'
    },
    {
      icon: svg3,
      head: 'Membership Sold',
      value: '1893',
      percentage1: '1'
    },
    {
      icon: svg2,
      head: 'Active Now',
      value: '189',
      percentage1: '39'
    }
  ];
  return (
    <div>
      <div className="bg-[#F2F2F2] px-5 sm:px-10 md:px-12 py-10">
        <PageHeader details={details} name={'Customer'} />
        {/* Table Section */}
        <div className="w-fit sm:w-auto bg-white p-10 mb-8">
          <div className="mainDev flex h-[100px] items-center justify-between ">
            <div className="section1 flex items-center gap-1 lg:gap-5 h-[70px] px-3 ">
              <div className="heading font-bold  text-[20px] lg:text-[22px]">
                <h1>All Customers </h1>
              </div>
            </div>

            <div className="section1 flex h-[70px]  ">
              <div className="dropDown font-bold  text-lg flex items-center justify-between h-full w-full">
                <Form className=" h-full flex  gap-5 lg:gap-10 justify-end w-full ">
                  <Form.Item label="" name="filter" className="flex items-center  h-full ">
                    <Select
                      style={{ width: 154, height: 38, color: 'black' }}
                      defaultValue={{ value: '', label: 'Advance Filter' }}
                      // onChange={handleChange}

                      options={[
                        {
                          value: 'All',
                          label: 'All',
                          name: 'All'
                        },
                        {
                          value: 'Onlypass',
                          label: 'Onlypass',
                          name: 'Onlypass'
                        },
                        {
                          value: 'JustGym',
                          label: 'JustGym',
                          name: 'JustGym'
                        }
                      ]}
                    />
                  </Form.Item>

                  <Form.Item label="" name="sort" className="text-start h-full flex items-center">
                    <Select
                      style={{ width: 154, height: 38, color: 'black' }}
                      defaultValue={{
                        value: '',
                        label: ' Sort by:Default'
                        // ${(<span className='font-bold'>Latest</span>)}
                      }}
                      // onChange={handleChange}
                      options={[
                        {
                          value: 'Newest',
                          label: 'newest',
                          name: 'newest'
                        },
                        {
                          value: 'Last month',
                          label: 'lastMonth',
                          name: 'lastMonth'
                        },
                        {
                          value: 'Earliest',
                          label: 'earliest',
                          name: 'earliest'
                        }
                      ]}
                    />
                  </Form.Item>
                </Form>
              </div>
            </div>
          </div>

          <Table
            columns={columns}
            dataSource={mainData?.data}
            //   dataSource={tableData}
            pagination={{ pageSize: 10 }}
            className=""
          />
        </div>
      </div>
    </div>
  );
};
export default Customer;
