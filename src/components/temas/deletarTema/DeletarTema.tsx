import React, { useEffect, useState } from 'react'
import { Card, CardActions, CardContent, Button, Typography} from '@material-ui/core';
import {Box} from '@mui/material';
import './DeletarTema.css';
import {useNavigate, useParams } from 'react-router-dom';
import { buscaId, deleteId } from '../../../services/Service';
import Tema from '../../../models/Tema';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import { UserState } from '../../../store/token/Reducer';



function DeletarTema() {
    let navigate = useNavigate();
    const { id } = useParams<{id: string}>();
    const [tema, setTema] = useState<Tema>()

    const token = useSelector<UserState, UserState["tokens"]>(
      (state) => state.tokens
  )

    useEffect(() => {
        if (token == "") {
          toast.error('Você precisa estar logado', {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: false,
            theme: "colored",
            progress: undefined,
            });
            navigate("/login")
    
        }
    }, [token])

    useEffect(() =>{
        if(id !== undefined){
            findById(id)
        }
    }, [id])

    async function findById(id: string) {
        buscaId(`/temas/${id}`, setTema, {
            headers: {
              'Authorization': token
            }
          })
        }

        function sim() {
          navigate('/temas')
            deleteId(`/temas/${id}`, {
              headers: {
                'Authorization': token
              }
            });
            toast.success('Tema deletado com sucesso', {
              position: "top-right",
              autoClose: 2000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: false,
              draggable: false,
              theme: "colored",
              progress: undefined,
              });
          }
        
          function nao() {
            navigate('/temas')
          }
          
  return (
    <>    <div className="marge">
      <Box m={2}>
        <Card variant="outlined" className="cx">
          <CardContent >
            <Box justifyContent="center">
              <Typography color="textSecondary" gutterBottom>
                Deseja deletar o Tema:
              </Typography>
              <Typography variant="h4" component="h2">
                {tema?.assunto}
              </Typography>                
            </Box>
          </CardContent>
          <CardActions>
            <Box display="flex" justifyContent="start" ml={1.0} mb={2} >
              <Box mx={2}>
                <Button onClick={sim} variant="contained" className="s">
                  Sim
                </Button>
              </Box>
              <Box mx={2}>
                <Button  onClick={nao} variant="contained" className="n">
                  Não
                </Button>
              </Box>
            </Box>
          </CardActions>
        </Card>
      </Box>
      </div>
    </>
  );
}
export default DeletarTema;