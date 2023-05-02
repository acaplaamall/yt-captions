import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import { Button } from '@mui/material';
import DescriptionIcon from '@mui/icons-material/Description';
import NotesIcon from '@mui/icons-material/Notes';
import { Document, Packer, Paragraph, TextRun } from "docx";
import { saveAs } from "file-saver";

function ExportPopup ({ isOpen, setOpen, currentRaw }) {
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
    };

    const exportAsDocx = () => {
        const ch = []
        currentRaw.text.map((item) => {
            ch.push(new Paragraph({
                children: [new TextRun(item + '\n')]
            }))
        })

        const doc = new Document({
            sections: [
                {
                    properties: {},
                    children: ch
                },
            ],
        });
        Packer.toBlob(doc).then(blob => {
            saveAs(blob, currentRaw.title);
        });

    }

    const exportAsTxt = () => {
        const blob = new Blob(currentRaw.text, {
            type: "text/plain;charset=utf-8"
        });
        saveAs(blob, currentRaw.title);

    }

    return (

        <Modal
            open={isOpen}
            onClose={() => { setOpen(false) }}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                    Export Transcript
                </Typography>
                <div className='export-types'>
                    <Box className='export-type-button' >
                        <Button variant="outlined" startIcon={<DescriptionIcon />} onClick={exportAsDocx}>
                            Formatted .docx
                        </Button>
                    </Box>
                    <Box className='export-type-button'>
                        <Button variant="outlined" startIcon={<NotesIcon />} onClick={exportAsTxt}>
                            Raw .txt
                        </Button>
                    </Box>
                </div>
            </Box>
        </Modal>

    )

} export default ExportPopup