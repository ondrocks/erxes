import { compose } from 'react-komposer';
import { getTrackerLoader, composerOptions } from '/imports/react-ui/utils';
import { Meteor } from 'meteor/meteor';
import { createSegment, editSegment } from '/imports/api/customers/methods';
import { Customers } from '/imports/api/customers/customers';
import Segments from '/imports/api/customers/segments';
import { SegmentsForm } from '../components';

function composer(props, onData) {
  const segmentHandle = props.id
    ? Meteor.subscribe('customers.segmentById', props.id).ready()
    : true;
  const headSegmentsHandle = Meteor.subscribe('customers.headSegments');

  const fields = Customers.getPublicFields().map(({ key, label }) => ({
    _id: key,
    title: label,
    selectedBy: 'none',
  }));

  if (segmentHandle && headSegmentsHandle.ready()) {
    onData(null, {
      fields,
      segment: Segments.findOne(props.id),
      headSegments: Segments.find().fetch().filter(segment => !segment.subOf),
      create({ doc }, callback) {
        createSegment.call(doc, callback);
      },
      edit({ id, doc }, callback) {
        editSegment.call({ id, doc }, callback);
      },
    });
  }
}

export default compose(getTrackerLoader(composer), composerOptions({}))(SegmentsForm);
