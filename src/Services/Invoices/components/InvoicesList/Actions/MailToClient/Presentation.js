import React from 'react'
import ContactMailIcon from '@material-ui/icons/ContactMail';
import { IconButton, Typography, Grid, Dialog, TextField, Button, CircularProgress } from "@material-ui/core"
import CloseIcon from '@material-ui/icons/Close'
import AttachFileIcon from '@material-ui/icons/AttachFile'
import DeleteIcon from '@material-ui/icons/Delete'
import { GoFileSymlinkFile } from 'react-icons/go'
import SunEditor from 'suneditor-react'
import ChipInput from 'material-ui-chip-input'
import Slide from '@material-ui/core/Slide'

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction='up' ref={ref} {...props} />
})

function Presentation(props) {
  const { handleChange, row, handleDelete, handleAdd, handleClose, handleClickOpen, open, state, handleSend, isMailing } = props
  const { id, isMailedToClient, isVoid, isPaymentDone } = row
  const {
    to,
    cc,
    bcc,
    helperText,
    isUploading,
    attachment,
    body,
    subject
  } = state
  return (
    <div>
      {
        isMailing ?
          <CircularProgress style={{ marginTop: "12px", marginLeft: "11px" }} size={18} />
          :
          (
            <IconButton hidden={isMailedToClient || isVoid || isPaymentDone} onClick={handleClickOpen} >
              <ContactMailIcon style={{ color: "blueviolet" }} />
            </IconButton>
          )
      }
      <Dialog
        disableEscapeKeyDown
        disableBackdropClick
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
        fullWidth
      >

        <div className="m-4" >
          <Typography variant='h6' gutterBottom></Typography>
          <form>
            <Grid container spacing={1}>
              <Grid item xs={12}>
                <ChipInput
                  value={to}
                  onAdd={(chip) => handleAdd('to', chip)}
                  onDelete={(_, index) => handleDelete('to', index)}
                  allowDuplicates={false}
                  label='To *'
                  fullWidth
                  helperText={helperText.to}
                  size='small'
                />
              </Grid>
              <Grid item xs={12}>
                <ChipInput
                  value={cc}
                  onAdd={(chip) => handleAdd('cc', chip)}
                  onDelete={(_, index) => handleDelete('cc', index)}
                  allowDuplicates={false}
                  label='CC'
                  fullWidth
                  helperText={helperText.cc}
                  size='small'
                />
              </Grid>
              <Grid item xs={12}>
                <ChipInput
                  value={bcc}
                  onAdd={(chip) => handleAdd('bcc', chip)}
                  onDelete={(_, index) => handleDelete('bcc', index)}
                  allowDuplicates={false}
                  label='BCC'
                  fullWidth
                  helperText={helperText.bcc}
                  size='small'
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  value={subject}
                  onChange={(e) => handleChange({ subject: e.target.value })}
                  name={'subject'}
                  fullWidth
                  size='small'
                  label='Subject'
                />
              </Grid>
              <Grid item xs={12}>
                <SunEditor
                  placeholder='Body'
                  setContents={body}
                  onChange={(data) => handleChange({ body: data })}
                  height={200}
                  setOptions={{
                    buttonList: [
                      [
                        'undo',
                        'redo',
                        'font',
                        'fontSize',
                        'formatBlock',
                        'bold',
                        'underline',
                        'italic',
                        'strike',
                        'subscript',
                        'superscript',
                        'fontColor',
                        'hiliteColor',
                        'removeFormat',
                        'outdent',
                        'indent',
                        'align',
                        'horizontalRule',
                        'list',
                        'lineHeight',
                        'table',
                        'link',
                        'image',
                        'video',
                        'showBlocks',
                        'codeView',
                      ],
                    ],
                  }}
                />
              </Grid>
              {/* <Grid item xs={12}>
                <input
                  id='contained-button-file-wafile'
                  multiple
                  type='file'
                />
                <label htmlFor='contained-button-file-wafile'>
                  <Button
                    variant='contained'
                    color='primary'
                    component='span'
                  >
                    <span>
                      <AttachFileIcon fontSize='small' color='inherit' />{' '}
                          Attachment
                        </span>
                  </Button>
                </label>
                {attachment.map((doc, index) => (
                  <div className='d-flex justify-content-between'>
                    <p>
                      {doc !== '' ? (
                        <a
                          target='_blank'
                          rel='noopener noreferrer'
                          href={doc}
                        >
                          <GoFileSymlinkFile size={22} />{' '}
                          {doc.slice(106, doc.lastIndexOf('_')) +
                            '_' +
                            (index + 1)}
                        </a>
                      ) : (
                          <p>No file choosen</p>
                        )}{' '}
                    </p>
                    <IconButton
                      onClick={() => handleDeleteAttachment(index)}
                    >
                      <DeleteIcon fontSize='small' />
                    </IconButton>
                  </div>
                ))}
                {isUploading ? <p>Uploading please wait...</p> : ''}
              </Grid> */}
            </Grid>
          </form>
          <br />
          <div className='d-flex justify-content-between'>
            <div />
            <div className="d-flex" >
              <Button
                onClick={handleClose}
                color='secondary'
                variant='contained'
              >
                Cancel
            </Button>
            &nbsp;&nbsp;
              <Button
                onClick={handleSend}
                color='primary'
                disabled={!to.length || !body.length || isMailing}
                variant='contained'
              >
                Send
            </Button>
            </div>

          </div>
        </div>
      </Dialog>
    </div>
  )
}

export default Presentation
