/* eslint-disable react/no-children-prop */
'use client';
import Button from "@components/ui/button"
import { Calendar, Edit, Sparkles, X } from "lucide-react";
import style from "@styles/quick-action.module.css"
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import SelectInput from "@components/ui/selectInput";
import Input from "@components/ui/input";
import { Textarea } from "@headlessui/react";
import { useQuestionGenerators } from '@hooks/useQuestionGenerator'



const QuickActionsButton = ({
    Subjects = [],
    Sessions = []
})=> {
    const [isDrawerOpen, setIsDrawerOpen] = useState(false)
    const [isMobile, setIsMobile] = useState(false)
    const [examSession, setExamSession] = useState("")
    const [subject, setSubject] = useState("")
    const [difficultyLevel, setDifficultyLevel] = useState("")
    const [numberOfQuestions, setnumberOfQuestions] = useState("")
    const [prompt, setprompt] = useState("")
    const [model, setModel] = useState("");
    const router = useRouter();

      // Check if device is mobile
    useEffect(() => {
        const checkIfMobile = () => {
        setIsMobile(window.innerWidth < 768)
        }

        checkIfMobile()
        window.addEventListener("resize", checkIfMobile)

        return () => {
        window.removeEventListener("resize", checkIfMobile)
        }
    }, [])

    const openDrawer = () => {
        setIsDrawerOpen(true)
        document.body.style.overflow = "hidden"
      }
    
      const closeDrawer = () => {
        setIsDrawerOpen(false)
        document.body.style.overflow = ""
      }

      const { generateQuestions, loading } = useQuestionGenerators();

      const handleGenerateQuestion = async() => {
        await generateQuestions(subject, examSession, difficultyLevel, numberOfQuestions, prompt, model);
      };

     

    return (
        <>
            <div className={style.card_content}>
                <div className={style.content_title}>
                    Quick Actions
                </div>
                <div className={style.button_container}>

                    <Button 
                        variant="primary" 
                        size="lg" 
                        className="w-full" 
                        children={<><Sparkles size={16} className={style.button_icon}/> Generate Questions with AI</>}
                        onClick={openDrawer}
                    />
                    <Button 
                        variant="outline" 
                        className="w-full" 
                        children={<><Edit size={16} className={style.button_icon} /> Create Exam</>}
                        onClick={() => {
                            router.push("/exam/create");
                        }
                    }
                    />
                    <Button 
                        variant="outline" 
                        className="w-full" 
                        children={<><Calendar size={16} className={style.button_icon} /> Schedule Session</>}
                        onClick={() => {
                            router.push("/exam/schedule");
                        }
                    }
                    />
                </div>
            </div>

            {isDrawerOpen && (

                    <div className={style.drawer_overlay} onClick={closeDrawer}>
                    <div
                    className={`${style.drawer} ${isMobile ? style.drawer_bottom : style.drawer_right}`}
                    onClick={(e) => e.stopPropagation()}
                    >
                    <div className={style.drawer_header}>
                        <h2 className={style.drawer_title}>Generate Questions with AI</h2>
                        <button className={style.close_button} onClick={closeDrawer}>
                        <X size={20} />
                        </button>
                    </div>

                    <div className={style.drawer_content}>
                        <div className={style.feature_explanation}>
                        <p>
                            Our AI-powered question generator creates custom questions based on your preferences. Select your exam
                            session, subject, and difficulty level to get started. 
                            <figcaption>Note that you need setup a payment system or buy points to use this service</figcaption>
                        </p>
                        </div>

                        <div className={style.options_container}>
                            <div className={style.option_group}>
                                <label className={style.option_label}>Exam Session</label>
                                <SelectInput
                                className={style.select_input}
                                value={examSession}
                                onChange={(e) => setExamSession(e.target.value)}
                                options={Sessions.map((option)=>(
                                    {
                                        label: option.name,
                                        value: option.id
                                    }
                                ))}
                                />
                            </div>

                            <div className={style.option_group}>
                                <label className={style.option_label}>Subject</label>
                                <SelectInput
                                    className={style.select_input}
                                    value={subject}
                                    onChange={(e) => setSubject(e.target.value)}
                                    options={Subjects.map((option) => ({
                                        label: option.name,
                                        value: option.name,
                                    }))}
                                />
                            </div>
                            

                            <div className={style.option_group}>
                                <label className={style.option_label}>Difficulty Level</label>
                         
                                <SelectInput
                                    className={style.select_input}
                                    value={difficultyLevel}
                                    onChange={(e)=>setDifficultyLevel(e.target.value)}
                                    options={[
                                        {label: "Select Question Level", value: ""},
                                        {label: "Easy", value: "easy"},
                                        {label: "Medium", value: "medium"},
                                        {label: "Hard", value: "hard"},
                                        {label: "Expert", value: "expert"}
                                    ]}
                                />
                            </div>

                            <div className={style.option_group}>
                                <label className={style.option_label}>Number of Questions</label>
                         
                                <Input
                                    className={style.select_input}
                                    value={numberOfQuestions}
                                    onChange={(e)=>setnumberOfQuestions(e.target.value)}
                                />
                            </div>

                            <div className={style.option_group}>
                                <label className={style.option_label}>Additional Instruction</label>
                         
                                <Textarea
                                    className={style.select_input}
                                    value={prompt}
                                    onChange={(e)=>setprompt(e.target.value)}
                                >
                                </Textarea>
                            </div>

                            <div className={style.option_group}>
                                <label className={style.option_label}>Choose Model</label>
                         
                                <SelectInput
                                    className={style.select_input}
                                    value={model}
                                    onChange={(e)=>setModel(e.target.value)}
                                    options={[
                                        {label: "Select a Model", value: ""},
                                        {label: "Google Gemini", value: "gemini"},
                                        {label: "DeepSeek R1", value: "deepseek"},
                                        {label: "OpenAI", value: "openai"}
                                    ]}
                                />
                            </div>
                        </div>

                        <div className={style.drawer_actions}>
                        <Button
                            variant="primary"
                            size="lg"
                            className={style.generate_button}
                            disabled={!examSession || !subject || !difficultyLevel || !numberOfQuestions || loading || !model}
                            onClick={handleGenerateQuestion}
                        >
                           {loading? "Generating..." : "Generate Questions"}
                        </Button>
                        <Button variant="outline" size="lg" className={style.cancel_button} onClick={closeDrawer}>
                            Cancel
                        </Button>
                        </div>
                    </div>
                    </div>
                    </div>



            )

            }
        </>
    );

}

export default QuickActionsButton;