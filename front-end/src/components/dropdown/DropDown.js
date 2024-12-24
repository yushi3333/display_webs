import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';

function DropDown() {
  return (
    <>
      <Dropdown data-bs-theme="dark">
        <Dropdown.Toggle id="dropdown-button-dark-example1" variant="secondary">
          Laptop Brand
        </Dropdown.Toggle>

        <Dropdown.Menu>
          <Dropdown.Item href="/Apple">
            Apple
          </Dropdown.Item>
          <Dropdown.Item href="/Dell">Dell</Dropdown.Item>
          <Dropdown.Item href="/ASUS">ASUS</Dropdown.Item>
          <Dropdown.Divider />
          <Dropdown.Item href="#/action-4">Separated link</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>

      
    </>
  );
}

export default DropDown;