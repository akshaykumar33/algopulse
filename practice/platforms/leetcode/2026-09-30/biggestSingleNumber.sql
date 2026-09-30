-- LeetCode 619: Biggest Single Number
-- Find the largest single number from MyNumbers table.
-- If no single number exists, report null.

SELECT MAX(num) AS num
FROM (
    SELECT num
    FROM MyNumbers
    GROUP BY num
    HAVING COUNT(*) = 1
) AS unique_numbers;
