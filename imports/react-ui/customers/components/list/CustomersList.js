import React from 'react';
import PropTypes from 'prop-types';
import { Table } from 'react-bootstrap';
import { Counts } from 'meteor/tmeasday:publish-counts';
import { Wrapper } from '/imports/react-ui/layout/components';
import { Pagination } from '/imports/react-ui/common';
import Sidebar from './sidebar/Sidebar';
import CustomerRow from './CustomerRow';
import { ManageColumns } from '../../containers';

const propTypes = {
  customers: PropTypes.array.isRequired,
  customerFields: PropTypes.array.isRequired,
  segments: PropTypes.array.isRequired,
  brands: PropTypes.array.isRequired,
  integrations: PropTypes.array.isRequired,
  tags: PropTypes.array.isRequired,
  loadMore: PropTypes.func.isRequired,
  hasMore: PropTypes.bool.isRequired,
};

function CustomersList({
  customers,
  customerFields,
  segments,
  brands,
  integrations,
  tags,
  loadMore,
  hasMore,
}) {
  const content = (
    <Pagination hasMore={hasMore} loadMore={loadMore}>
      <Table className="no-wrap">
        <thead>
          <tr>
            <th>
              <ManageColumns />
            </th>
            {customerFields.map(({ key, label }) => <th key={key}>{label}</th>)}
            <th>Tags</th>
          </tr>
        </thead>
        <tbody>
          {customers.map(customer => (
            <CustomerRow customer={customer} customerFields={customerFields} key={customer._id} />
          ))}
        </tbody>
      </Table>
    </Pagination>
  );

  const breadcrumb = [{ title: `Customers (${Counts.get('customers.list.count')})` }];

  return (
    <div>
      <Wrapper
        header={<Wrapper.Header breadcrumb={breadcrumb} />}
        leftSidebar={
          <Sidebar segments={segments} brands={brands} integrations={integrations} tags={tags} />
        }
        content={content}
      />
    </div>
  );
}

CustomersList.propTypes = propTypes;

export default CustomersList;
