//testes de integração: testa uma funçao e todo o processo adiante.
//testes unitarios: testa funcões de forma independente desconectado das dependencias(testa o conteudo dentro de uma funçao).



import { SubmitFeedbackService } from "./SubmitFeedbackService"

//spys ou espioes: eles sabem se uma função foi chamada
//como funcionam: 
//eles se infiltram se passando por metodos e informam se foram chamado.
const createFeedbackSpy = jest.fn();
const sendMailSpy = jest.fn();

const submitFeedback = new SubmitFeedbackService(
  { create: createFeedbackSpy }, //dependencias falsas(mock)
  { sendMail: sendMailSpy } 
);

describe('Submit feedback', ()=>{
  it('should be able to submit a feedback', async ()=>{
    await expect(submitFeedback.execute({
      type: 'BUG',
      comment: 'example comment',
      screenshot: 'data:image/png;base64'
    })).resolves.not.toThrow(); //resolva essa função ate o final e nao dispare nenhum erro.
    expect(createFeedbackSpy).toHaveBeenCalled();
    expect(sendMailSpy).toHaveBeenCalled();
  });

  it('should not be able to submit a feedback without type', async ()=>{
    await expect(submitFeedback.execute({
      type: '',
      comment: 'example comment',
      screenshot: 'data:image/png;base64'
    })).rejects.toThrow(); //espero que rejeite e que dispare um erro
  });

  it('should not be able to submit a feedback without comment', async ()=>{
    await expect(submitFeedback.execute({
      type: 'BUG',
      comment: '',
      screenshot: 'data:image/png;base64'
    })).rejects.toThrow();
  });

  it('should not be able to submit a feedback with an invalid screenshot', async ()=>{
    await expect(submitFeedback.execute({
      type: 'BUG',
      comment: 'ta tudo bugado',
      screenshot: '2data:image/png;base64'
    })).rejects.toThrow();
  });
})