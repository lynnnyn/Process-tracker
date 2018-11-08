import random
import time
import sys

# config variables
total_time = 60     # total time (in second)
granularity = 2.0   # control granularity of progress print
failure_rate = 0.5  # chance of failure

iters = int(100.0 / granularity)

# generate a random number between 0 and (iters / failure_rate) that controls
# which iteration would fail. the program will not fail if (failed_iter > iters).
# otherwise, it will fail on failed_iter.
if failure_rate == 0:
    failed_iter = -1
else:
    failed_iter = random.randint(0, int(iters / failure_rate))

# print the percentage to stdout
def print_percent(i):
    print("%.2f" % (float(i) / float(iters) * 100))
    sys.stdout.flush()
    
for i in range(0, iters):
    if i == failed_iter:
        # exit code 1, abnormal termination
        sys.exit(1)
    else:
        # print the percentage
        time.sleep(total_time/iters)
        print_percent(i)

print_percent(iters)