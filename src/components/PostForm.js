import React from 'react'
import {ValidatorForm} from 'react-form-validator-core'
import {TextValidator} from 'react-material-ui-form-validator'
import {FormControl, Input, InputLabel, MenuItem, Select} from 'material-ui'
import {connect} from 'react-redux'

class PostForm extends React.Component {
  constructor(props) {
    super()
    const {post} = props
    this.state = {
      post,
    }
  }

  submit = () => {
    // called from the outside to trigger submission
    this.refs.form.submit()
  }

  handleSubmit = () => {
    const {onSubmit} = this.props
    const {post} = this.state
    onSubmit(post)
  }

  handleChange = (event) => {
    // change a property of post
    const {post} = this.state
    post[event.target.name] = event.target.value
    this.setState({post})
  }

  handleSelectChange = (key, event) => {
    const {post} = this.state
    post[key] = event.target.value
    this.setState({post})
  }

  categoryItems() {
    // put it in a set, it's faster to check inclusion
    const allCategories = this.props.categories,
      currentCategory = this.state.post.category
    return allCategories.map(
      category => <MenuItem
        key={category}
        name={category}
        value={category}
        selected={category === currentCategory}
      >
        {category}
      </MenuItem>,
    )
  }

  render() {
    const {post} = this.state

    return <ValidatorForm
      ref="form"
      onSubmit={this.handleSubmit}
    >
      <TextValidator
        name="author"
        label="Author"
        type="text"
        autoFocus
        required
        validators={['required']}
        errorMessages={['this field is required']}
        fullWidth
        onChange={this.handleChange}
        value={post.author}
      />

      <TextValidator
        name="title"
        required
        margin="dense"
        label="Title"
        type="text"
        validators={['required']}
        errorMessages={['this field is required']}
        fullWidth
        onChange={this.handleChange}
        value={post.title}
      />

      <TextValidator
        name="body"
        required
        validators={['required']}
        errorMessages={['this field is required']}
        multiline
        margin="dense"
        label="Content"
        fullWidth
        onChange={this.handleChange}
        value={post.body}
      />
      <FormControl
        margin="dense"
        fullWidth>
        <InputLabel htmlFor="category">Category</InputLabel>
        <Select
          name="category"
          required
          /*validators={['required']}
          errorMessages={['this field is required']}*/
          fullWidth
          onChange={this.handleSelectChange.bind(null, "category")}
          input={<Input id="category"/>}
          value={post.category}
        >
          {this.categoryItems()}
        </Select>
      </FormControl>

    </ValidatorForm>
  }
}

function mapStateToProps(state) {
  return {
    categories: state.categories.categories.map(
      category => category.name,
    ),
  }
}

export default connect(
  mapStateToProps,
  null, null,
  {withRef: true},
)(PostForm)
