import { Meteor } from 'meteor/meteor';
import { compose } from 'react-komposer';
import { getTrackerLoader, composerOptions } from '/imports/react-ui/utils';
import MainLayout from '../components/MainLayout';

function composer(props, onData) {
  onData(null, {
    loggedIn: !!Meteor.user(),
    loggingIn: Meteor.loggingIn(),
  });
}

export default compose(getTrackerLoader(composer), composerOptions({}))(MainLayout);
