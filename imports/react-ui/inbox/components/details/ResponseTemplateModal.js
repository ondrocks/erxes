import React, { PropTypes, Component } from 'react';
import {
  Modal,
  ButtonToolbar,
  Button,
  FormGroup,
  FormControl,
  ControlLabel,
} from 'react-bootstrap';
import { ModalTrigger } from '/imports/react-ui/common';

const propTypes = {
  onSave: PropTypes.func.isRequired,
  brands: PropTypes.array,
  trigger: PropTypes.node,
  brandId: PropTypes.string.isRequired,
};

class ResponseTemplateModal extends Component {
  constructor(props) {
    super(props);

    this.onSave = this.onSave.bind(this);
  }

  onSave() {
    const doc = {
      brandId: document.getElementById('template-brand-id').value,
      name: document.getElementById('template-name').value,
    };

    this.props.onSave(doc.brandId, doc.name);
  }

  render() {
    const { brands, trigger, brandId } = this.props;

    return (
      <ModalTrigger title="Create response template" trigger={trigger}>

        <FormGroup controlId="template-brand-id">
          <ControlLabel>Brand</ControlLabel>

          <FormControl componentClass="select" placeholder="Select Brand" defaultValue={brandId}>
            {brands.map(brand => <option key={brand._id} value={brand._id}>{brand.name}</option>)}
          </FormControl>
        </FormGroup>

        <FormGroup>
          <ControlLabel>Name</ControlLabel>
          <FormControl id="template-name" type="text" required />
        </FormGroup>

        <Modal.Footer>
          <ButtonToolbar className="pull-right">
            <Button onClick={this.onSave} type="button" bsStyle="primary">
              Save
            </Button>
          </ButtonToolbar>
        </Modal.Footer>
      </ModalTrigger>
    );
  }
}

ResponseTemplateModal.propTypes = propTypes;

export default ResponseTemplateModal;
