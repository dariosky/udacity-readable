import React from 'react'
import {ValidatorForm} from 'react-form-validator-core'
import {TextValidator} from 'react-material-ui-form-validator'


export class PostForm extends React.Component {
  constructor() {
    super()
    this.state = {
      post: {},
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

  render() {
    const {post} = this.state

    return <ValidatorForm
      ref="form"
      onSubmit={this.handleSubmit}
      onError={errors => {
        console.log(errors)
      }}
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
    </ValidatorForm>
  }
}
