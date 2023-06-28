import PropTypes from 'prop-types';
import style from '../Filter/Filter.module.css';

function Filter({onChange}) {
  return (
    <>
      <label className={style.findContact__label}>
        Find contact by name
        <input
          className={style.findContact__input}
          onChange={onChange}
          type="text"
          name="find"
        />
      </label>
    </>
  );
}

Filter.propTypes = {
  onChange: PropTypes.func.isRequired,
};

export default Filter;
