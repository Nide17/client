import React, { useState, useEffect, useCallback } from 'react'
import { Container, Col, Row, Button } from 'reactstrap'
import { useParams, useHistory } from 'react-router-dom'
import CyclonLoading from '../../rLoading/CyclonLoading'
import SpinningBubbles from '../../rLoading/SpinningBubbles'
import { connect } from 'react-redux'
import { getOneScore } from '../../../redux/scores/scores.actions'
import ReviewView from './ReviewView'
import QuizComments from './quizComments/QuizComments'
import OnLastAnswer from './OnLastAnswer'
import TitleRow from './TitleRow'
import NotAuthenticated from '../../auth/NotAuthenticated'
// import SimilarQuizes from './SimilarQuizes'
import ResponsiveAd from '../../adsenses/ResponsiveAd'
import SquareAd from '../../adsenses/SquareAd'

const ReviewQuiz = ({ auth, sC, getOneScore }) => {

    const [currentQuestion, setCurrentQuestion] = useState(0)
    const [lastAnswer, setLastAnswer] = useState(false)

    const qnsAll = sC.oneScore && sC.oneScore.review && sC.oneScore.review.questions
    const curRevQn = qnsAll && qnsAll[currentQuestion]

    // Access route parameters
    const { reviewId } = useParams()

    // Load the image
    const [imgLoaded, setImgLoaded] = useState(false)
    const onLoad = useCallback(() => { setImgLoaded(true) }, [])
    useEffect(() => { onLoad() }, [onLoad])

    // Lifecycle methods
    useEffect(() => {
        getOneScore(reviewId)
    }, [getOneScore, reviewId])

    const history = useHistory()
    const goBack = () => {
        history.goBack()
    }

    return (

        <Container>

            {auth.isAuthenticated ?

                !sC.isLoading ?
                    <>
                        <Row><Col sm="6"><ResponsiveAd /></Col></Row>
                        {
                            sC.oneScore ?

                                qnsAll.length > 0 ?

                                    <>
                                        <Row className="main d-flex flex-column justify-content-center rounded border border-primary my-5 py-4 w-80" key={Math.floor(Math.random() * 1000)}>

                                            {lastAnswer ?

                                                <OnLastAnswer
                                                    isAuthenticated={auth.isAuthenticated}
                                                    thisQuiz={sC.oneScore.quiz}
                                                    goBack={goBack} /> :

                                                imgLoaded ?
                                                    <div className="question-view">
                                                        <TitleRow
                                                            thisReview={sC.oneScore.review}
                                                            score={sC.oneScore.marks}
                                                            qnsAll={qnsAll}
                                                            curRevQn={curRevQn}
                                                            currentQuestion={currentQuestion}
                                                            uRole={auth.user.role} />

                                                        {/* Image */}
                                                        {curRevQn && curRevQn.question_image ?
                                                            <Row>
                                                                <Col>
                                                                    <div className="my-3 mx-sm-5 px-sm-5 d-flex justify-content-center align-items-center">
                                                                        <img className="mt-2 mt-lg-0 mx-sm-5 px-sm-5" src={curRevQn && curRevQn.question_image} onLoad={onLoad} alt="Question Illustration" />
                                                                    </div>
                                                                </Col>
                                                            </Row> : null}

                                                        <ReviewView
                                                            qnsAll={qnsAll}
                                                            curRevQn={curRevQn}
                                                            currentQuestion={currentQuestion}
                                                            lastAnswer={lastAnswer}
                                                            setLastAnswer={setLastAnswer}
                                                            setCurrentQuestion={setCurrentQuestion} />

                                                        <QuizComments quizID={sC.oneScore.quiz && sC.oneScore.quiz._id} currentUser={auth && auth.user} />
                                                    </div>
                                                    : <SpinningBubbles title='question' />}

                                        </Row>
                                        {/* <SimilarQuizes categoryId={sC.oneScore.quiz && sC.oneScore.quiz.category} /> */}
                                    </> :

                                    <Row className="main d-flex flex-column justify-content-center rounded border border-primary my-5 py-4 w-80 text-center">
                                        <h1 className="text-danger font-weight-bolder">404</h1>
                                        <h4>Quiz's questions unavailable! Refresh!!</h4>
                                        <Button color="info" style={{ width: "120px" }} className="mx-auto mt-4"><a href="/webmaster" className="text-white">Back</a></Button>
                                    </Row> :

                                <Row className="main d-flex flex-column justify-content-center rounded border border-primary my-5 py-4 w-80 text-center">
                                    <h1 className="text-danger font-weight-bolder">404</h1>
                                    <h4>The page you're looking for is not found!</h4>
                                    <Button color="info" style={{ width: "120px" }} className="mx-auto mt-4"><a href="/webmaster" className="text-white">Back</a></Button>
                                </Row>}

                        <Row><Col sm="6"><SquareAd /></Col></Row></> :

                    <CyclonLoading /> :

                <NotAuthenticated auth={auth} />
            }
        </Container>)
}

const mapStateToProps = state => ({
    sC: state.scoresReducer
})

export default connect(mapStateToProps, { getOneScore })(ReviewQuiz)