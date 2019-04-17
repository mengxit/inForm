# nudgerplus
MDE Studio 3 - Nudge+

#Features to Dev
--Review form before submission
--Form percentage progress (as in figma) 
--Send different message if does not qualify, or if none of benefits is qualified
--Blank submissions not allowed

#Algorithm Enhancement
--Make the outputs a range (Min - Max), maybe retrieve Array[i] and Array[i + 1]
-- -- Being conservative here might be the best route - as to not be overzealous.
--Double check that all income/benefit boundary are MONTHLY
--Take the upper boundary in income bucket has the potential danger to "disqualify" people for benefits they should be eligible for
--Double check child count and household count (e.g. household count should always > child count)
--Edge cases: 
-- -- what will happen in max child count/income/household count senario? How will the values be passed and processed?

#Begin Page & Progress Bar
-- The progress bar currently begins at 0, and progresses with a lag of one answer.
-- Creating a 'Begin' Page before the  questions start, and label that button 'nxtbutton' which would help move the progress bar up once and begin at the right moment. 
-- A begin page would also be a better UX. 

#Tips
--Hold option + command + up/down for multiple rows editing
