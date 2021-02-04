import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles'
import { TextField, MenuItem, IconButton } from '@material-ui/core'


const styles = theme => ({
  margin: {
    margin: theme.spacing(1)
  },
  textField: {
    borderRadius: theme.shape.borderRadius
  },
  input: {
    flex: 1
  },
  adornment: {
    marginRight: '-4px'
  }
})

class InputRow extends Component {
  renderInput(type) {
    const {
      classes,
      name,
      multiline,
      rows,
      selected,
      value,
      label,
      handleChange,
      handleBlur,
      options,
      error,
      endAdornment,
      adornmentType,
      adornmentFunction,
      disableAdornment,
      disabled,
      readOnly
    } = this.props
    switch (type) {
      case 'text':
        return (
          <TextField
            fullWidth
            name={name}
            label={label}
            value={value}
            disabled={disabled}
            variant="filled"
            error={error}
            multiline={multiline}
            rows={rows}
            InputProps={{
              readOnly,
              fullWidth: true,
              autoComplete: 'off',
              className: classes.textField,
              disableUnderline: true,
              endAdornment: (
                adornmentType === 'string' ? endAdornment
                  : (
                    <IconButton
                      disabled={disableAdornment}
                      size="small"
                      className={classes.adornment}
                      onClick={adornmentFunction}
                    >
                      {endAdornment}
                    </IconButton>
                  )
              )
            }}
            onChange={handleChange}
            onBlur={handleBlur}
          />
        )
      case 'select':
        return (
          <TextField
            select
            fullWidth
            label={label}
            variant="filled"
            disabled={disabled}
            name={name}
            value={selected}
            SelectProps={{
              disableUnderline: true,
              className: classes.textField
            }}
            onChange={handleChange}
            onBlur={handleBlur}
          >
            {options.map(option => (
              <MenuItem
                key={option.value}
                name={option.name}
                value={option.value}
                disabled={option.disabled}
              >
                {option.label}
              </MenuItem>
            ))}
          </TextField>
        )
      default:
        return <div>error..</div>
    }
  }

  render() {
    const {
      classes, type
    } = this.props
    return <div className={classes.input}>{this.renderInput(type)}</div>
  }
}

// InputRow.defaultProps = {
//   name: '',
//   multiline: false,
//   rows: 1,
//   selected: '',
//   value: '',
//   label: '',
//   options: [],
//   error: false,
//   endAdornment: {},
//   adornmentType: 'string',
//   adornmentFunction: () => { },
//   handleBlur: () => { },
//   handleChange: () => { },
//   disableAdornment: false,
//   readOnly: false
// }

// InputRow.propTypes = {
//   classes: PropTypes.object.isRequired,
//   type: PropTypes.string.isRequired,
//   name: PropTypes.string,
//   multiline: PropTypes.bool,
//   rows: PropTypes.number,
//   selected: PropTypes.string,
//   value: PropTypes.string,
//   label: PropTypes.string,
//   handleChange: PropTypes.func,
//   handleBlur: PropTypes.func,
//   options: PropTypes.object,
//   error: PropTypes.bool,
//   endAdornment: PropTypes.node,
//   adornmentType: PropTypes.string,
//   adornmentFunction: PropTypes.func,
//   disableAdornment: PropTypes.bool,
//   readOnly: PropTypes.bool
// }

export default withStyles(styles)(InputRow)
