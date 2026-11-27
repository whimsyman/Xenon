import{P as e,i as t}from"./core-C0xX_T_5.js";import{i as n}from"./codestyle-ChPeKBTF.js";var r=`
cout|v|iostream|std::ostream cout|The screen. Send values to it with <<.
cin|v|iostream|std::istream cin|The keyboard. Read values from it with >>.
cerr|v|iostream|std::ostream cerr|Error output: for messages to the programmer, shown at once.
clog|v|iostream|std::ostream clog|Log output.
endl|m|iostream|std::endl|Ends the line and forces the output to be written. Prefer '\\n'.
flush|m|iostream|std::flush|Forces buffered output to be written now.
ws|m|iostream|std::ws|Skips whitespace in input. Used before std::getline.
boolalpha|m|iostream|std::boolalpha|Prints bool as true / false instead of 1 / 0.
noboolalpha|m|iostream|std::noboolalpha|Prints bool as 1 / 0 again.
hex|m|iostream|std::hex|Prints integers in base 16.
dec|m|iostream|std::dec|Prints integers in base 10.
oct|m|iostream|std::oct|Prints integers in base 8.
fixed|m|iostream|std::fixed|Fixed number of digits after the decimal point (with setprecision).
scientific|m|iostream|std::scientific|Exponent notation.
left|m|iostream|std::left|Left-aligns within the field width.
right|m|iostream|std::right|Right-aligns within the field width.
showpos|m|iostream|std::showpos|Shows a + on positive numbers.
showbase|m|iostream|std::showbase|Shows 0x / 0 prefixes.
uppercase|m|iostream|std::uppercase|Upper-case hex digits and exponents.
setw|f|iomanip|setw(int width)|Minimum width of the next item printed.
setprecision|f|iomanip|setprecision(int digits)|Digits shown for floating-point numbers.
setfill|f|iomanip|setfill(char c)|Padding character used with setw.
quoted|f|iomanip|quoted(const std::string& s)|Reads or writes a string in quotes.
string|c|string|class std::string|Text that owns its characters and can change.
wstring|c|string|class std::wstring|A string of wide characters.
getline|f|string|std::istream& getline(std::istream& in, std::string& line)|Reads a whole line of text.
to_string|f|string|std::string to_string(number)|Converts a number to text.
stoi|f|string|int stoi(const std::string& text)|Converts text to an int. Throws if it is not a number.
stol|f|string|long stol(const std::string& text)|Converts text to a long.
stoll|f|string|long long stoll(const std::string& text)|Converts text to a long long.
stod|f|string|double stod(const std::string& text)|Converts text to a double.
stof|f|string|float stof(const std::string& text)|Converts text to a float.
string_view|c|string_view|class std::string_view|A read-only view of text owned elsewhere. Cheap to pass.
vector|c|vector|template class std::vector<T>|A resizable list stored in one block of memory. The default container.
array|c|array|template class std::array<T, N>|A fixed-size array whose length is part of its type.
deque|c|deque|template class std::deque<T>|A list that is fast to grow at both ends.
list|c|list|template class std::list<T>|A doubly linked list.
forward_list|c|forward_list|template class std::forward_list<T>|A singly linked list.
map|c|map|template class std::map<Key, Value>|Key to value pairs, kept sorted by key.
multimap|c|map|template class std::multimap<Key, Value>|A map that allows repeated keys.
unordered_map|c|unordered_map|template class std::unordered_map<Key, Value>|Key to value pairs in a hash table. Fast lookup, no order.
set|c|set|template class std::set<T>|Unique values, kept sorted.
multiset|c|set|template class std::multiset<T>|A set that allows repeats.
unordered_set|c|unordered_set|template class std::unordered_set<T>|Unique values in a hash table.
stack|c|stack|template class std::stack<T>|Last in, first out.
queue|c|queue|template class std::queue<T>|First in, first out.
priority_queue|c|queue|template class std::priority_queue<T>|Always gives the largest element next.
span|c|span|template class std::span<T>|A view of a run of elements: a pointer and a length.
bitset|c|bitset|template class std::bitset<N>|A fixed number of bits with set / test / flip.
pair|c|utility|template struct std::pair<A, B>|Two values: first and second.
tuple|c|tuple|template class std::tuple<Ts...>|Several values of different types.
optional|c|optional|template class std::optional<T>|Either a T or nothing.
nullopt|k|optional|std::nullopt|The empty state of an optional.
variant|c|variant|template class std::variant<Ts...>|Exactly one of several types.
visit|f|variant|decltype(auto) visit(Visitor&& v, Variant&& var)|Calls the visitor with whatever the variant holds.
holds_alternative|f|variant|bool holds_alternative<T>(const variant& v)|Whether the variant currently holds a T.
get|f|variant|T& get<T>(variant& v)|The value held, as a T. Throws if it holds something else.
get_if|f|variant|T* get_if<T>(variant* v)|A pointer to the value if it is a T, otherwise nullptr.
any|c|any|class std::any|Holds a value of any copyable type.
expected|c|expected|template class std::expected<T, E>|Either a value or an error.
unexpected|c|expected|template class std::unexpected<E>|Wraps an error for returning from a function that returns expected.
unique_ptr|c|memory|template class std::unique_ptr<T>|Owns one heap object and deletes it automatically. Cannot be copied.
shared_ptr|c|memory|template class std::shared_ptr<T>|Shared ownership by reference counting.
weak_ptr|c|memory|template class std::weak_ptr<T>|Observes a shared object without owning it.
make_unique|f|memory|std::unique_ptr<T> make_unique<T>(args...)|Creates a heap object owned by a unique_ptr.
make_shared|f|memory|std::shared_ptr<T> make_shared<T>(args...)|Creates a heap object owned by a shared_ptr.
construct_at|f|memory|T* construct_at(T* where, args...)|Constructs an object in memory you already have.
destroy_at|f|memory|void destroy_at(T* object)|Runs an object's destructor without freeing memory.
move|f|utility|T&& move(T& value)|Marks a value as movable: its contents may be taken.
forward|f|utility|T&& forward<T>(T& value)|Passes an argument on exactly as it was received.
swap|f|utility|void swap(T& a, T& b)|Exchanges two values.
exchange|f|utility|T exchange(T& object, U&& newValue)|Stores a new value and returns the old one.
as_const|f|utility|const T& as_const(T& value)|A const view of a value.
size_t|c|cstddef|std::size_t|The unsigned type used for sizes and indexes.
ptrdiff_t|c|cstddef|std::ptrdiff_t|The signed type for the distance between two positions.
byte|c|cstddef|enum class std::byte|One raw byte, not a character or a number.
nullptr_t|c|cstddef|std::nullptr_t|The type of nullptr.
int8_t|c|cstdint|std::int8_t|Signed integer, exactly 8 bits.
int16_t|c|cstdint|std::int16_t|Signed integer, exactly 16 bits.
int32_t|c|cstdint|std::int32_t|Signed integer, exactly 32 bits.
int64_t|c|cstdint|std::int64_t|Signed integer, exactly 64 bits.
uint8_t|c|cstdint|std::uint8_t|Unsigned integer, exactly 8 bits.
uint16_t|c|cstdint|std::uint16_t|Unsigned integer, exactly 16 bits.
uint32_t|c|cstdint|std::uint32_t|Unsigned integer, exactly 32 bits.
uint64_t|c|cstdint|std::uint64_t|Unsigned integer, exactly 64 bits.
uintptr_t|c|cstdint|std::uintptr_t|An unsigned integer wide enough to hold an address.
numeric_limits|c|limits|template class std::numeric_limits<T>|The limits of a number type: max(), min(), lowest().
sort|f|algorithm|void sort(first, last [, compare])|Sorts a range.
stable_sort|f|algorithm|void stable_sort(first, last [, compare])|Sorts, keeping equal elements in their original order.
find|f|algorithm|iterator find(first, last, const T& value)|The first element equal to value, or last.
find_if|f|algorithm|iterator find_if(first, last, predicate)|The first element satisfying the predicate, or last.
count|f|algorithm|count(first, last, const T& value)|How many elements equal value.
count_if|f|algorithm|count_if(first, last, predicate)|How many elements satisfy the predicate.
all_of|f|algorithm|bool all_of(first, last, predicate)|True if every element satisfies the predicate.
any_of|f|algorithm|bool any_of(first, last, predicate)|True if at least one element satisfies the predicate.
none_of|f|algorithm|bool none_of(first, last, predicate)|True if no element satisfies the predicate.
for_each|f|algorithm|for_each(first, last, function)|Calls a function with every element.
transform|f|algorithm|transform(first, last, output, function)|Writes function(element) for every element.
copy|f|algorithm|copy(first, last, output)|Copies a range.
copy_if|f|algorithm|copy_if(first, last, output, predicate)|Copies the elements that satisfy the predicate.
fill|f|algorithm|void fill(first, last, const T& value)|Sets every element to value.
reverse|f|algorithm|void reverse(first, last)|Reverses the order of a range.
rotate|f|algorithm|rotate(first, middle, last)|Rotates a range so middle becomes first.
unique|f|algorithm|iterator unique(first, last)|Moves adjacent duplicates to the end. Returns where they start.
remove|f|algorithm|iterator remove(first, last, const T& value)|Moves matching elements to the end. Returns where they start.
remove_if|f|algorithm|iterator remove_if(first, last, predicate)|Moves matching elements to the end.
replace|f|algorithm|void replace(first, last, const T& from, const T& to)|Replaces every from with to.
min|f|algorithm|const T& min(const T& a, const T& b)|The smaller of two values.
max|f|algorithm|const T& max(const T& a, const T& b)|The larger of two values.
minmax|f|algorithm|pair minmax(const T& a, const T& b)|The smaller and the larger.
clamp|f|algorithm|const T& clamp(const T& value, const T& low, const T& high)|Keeps a value within a range.
min_element|f|algorithm|iterator min_element(first, last)|An iterator to the smallest element.
max_element|f|algorithm|iterator max_element(first, last)|An iterator to the largest element.
binary_search|f|algorithm|bool binary_search(first, last, const T& value)|Whether a sorted range contains value.
lower_bound|f|algorithm|iterator lower_bound(first, last, const T& value)|The first element not less than value, in a sorted range.
upper_bound|f|algorithm|iterator upper_bound(first, last, const T& value)|The first element greater than value, in a sorted range.
is_sorted|f|algorithm|bool is_sorted(first, last)|Whether a range is in order.
is_permutation|f|algorithm|bool is_permutation(first1, last1, first2)|Whether two ranges hold the same elements.
shuffle|f|algorithm|void shuffle(first, last, engine)|Puts a range in random order.
next_permutation|f|algorithm|bool next_permutation(first, last)|Rearranges into the next ordering.
equal|f|algorithm|bool equal(first1, last1, first2)|Whether two ranges are equal.
erase|f|vector|erase(container, const T& value)|Removes every element equal to value from a container.
erase_if|f|vector|erase_if(container, predicate)|Removes every element satisfying the predicate.
accumulate|f|numeric|T accumulate(first, last, T init)|Adds up a range, left to right.
reduce|f|numeric|T reduce([policy,] first, last [, init])|Adds up a range in any order; can run in parallel.
transform_reduce|f|numeric|T transform_reduce([policy,] first, last, init, combine, transform)|Transforms each element, then combines.
iota|f|numeric|void iota(first, last, T start)|Fills a range with start, start + 1, start + 2, ...
gcd|f|numeric|gcd(a, b)|Greatest common divisor.
lcm|f|numeric|lcm(a, b)|Least common multiple.
midpoint|f|numeric|midpoint(a, b)|Half-way between two values, without overflow.
begin|f|iterator|begin(container)|An iterator to the first element.
end|f|iterator|end(container)|The position one past the last element.
size|f|iterator|size(container)|The number of elements.
ssize|f|iterator|ssize(container)|The number of elements, as a signed number.
distance|f|iterator|distance(first, last)|How many steps from first to last.
next|f|iterator|next(iterator [, n])|The iterator n steps on.
prev|f|iterator|prev(iterator [, n])|The iterator n steps back.
advance|f|iterator|void advance(iterator& it, n)|Moves an iterator n steps.
back_inserter|f|iterator|back_inserter(container)|An output iterator that calls push_back.
abs|f|cmath|abs(x)|The size of a number without its sign.
sqrt|f|cmath|double sqrt(double x)|Square root.
pow|f|cmath|double pow(double base, double exponent)|base raised to exponent.
round|f|cmath|double round(double x)|Rounds to the nearest whole number.
floor|f|cmath|double floor(double x)|Rounds down.
ceil|f|cmath|double ceil(double x)|Rounds up.
trunc|f|cmath|double trunc(double x)|Cuts off the decimals.
fmod|f|cmath|double fmod(double x, double y)|Remainder of floating-point division.
hypot|f|cmath|double hypot(double x, double y)|sqrt(x*x + y*y).
sin|f|cmath|double sin(double radians)|Sine.
cos|f|cmath|double cos(double radians)|Cosine.
tan|f|cmath|double tan(double radians)|Tangent.
atan2|f|cmath|double atan2(double y, double x)|The angle of the point (x, y).
exp|f|cmath|double exp(double x)|e raised to x.
log|f|cmath|double log(double x)|Natural logarithm.
log2|f|cmath|double log2(double x)|Logarithm base 2.
log10|f|cmath|double log10(double x)|Logarithm base 10.
isnan|f|cmath|bool isnan(double x)|Whether x is not-a-number.
isinf|f|cmath|bool isinf(double x)|Whether x is infinite.
lerp|f|cmath|double lerp(double a, double b, double t)|The point a fraction t of the way from a to b.
isdigit|f|cctype|int isdigit(int c)|Whether a character is a digit.
isalpha|f|cctype|int isalpha(int c)|Whether a character is a letter.
isalnum|f|cctype|int isalnum(int c)|Whether a character is a letter or digit.
isspace|f|cctype|int isspace(int c)|Whether a character is a space, tab or new line.
isupper|f|cctype|int isupper(int c)|Whether a character is an upper-case letter.
islower|f|cctype|int islower(int c)|Whether a character is a lower-case letter.
ispunct|f|cctype|int ispunct(int c)|Whether a character is punctuation.
toupper|f|cctype|int toupper(int c)|The upper-case form of a character.
tolower|f|cctype|int tolower(int c)|The lower-case form of a character.
exit|f|cstdlib|void exit(int code)|Ends the program now.
abort|f|cstdlib|void abort()|Ends the program immediately, with no clean-up.
strlen|f|cstring|std::size_t strlen(const char* text)|The length of a C-string.
strcmp|f|cstring|int strcmp(const char* a, const char* b)|Compares two C-strings. 0 means equal.
memcpy|f|cstring|void* memcpy(void* to, const void* from, std::size_t bytes)|Copies raw bytes.
function|c|functional|template class std::function<R(Args...)>|Holds anything callable with a matching signature.
move_only_function|c|functional|template class std::move_only_function<R(Args...)>|Like function, for callables that cannot be copied.
ref|f|functional|reference_wrapper<T> ref(T& value)|Passes a reference where a copy would be made.
cref|f|functional|reference_wrapper<const T> cref(const T& value)|Passes a const reference where a copy would be made.
reference_wrapper|c|functional|template class std::reference_wrapper<T>|A reference that can be stored in a container.
invoke|f|functional|invoke(callable, args...)|Calls anything callable.
greater|c|functional|struct std::greater<>|Compares with >. Pass to sort for descending order.
less|c|functional|struct std::less<>|Compares with <.
plus|c|functional|struct std::plus<>|Adds two values.
hash|c|functional|template struct std::hash<T>|Turns a value into a number for hash tables.
exception|c|exception|class std::exception|The base class of the standard exceptions.
runtime_error|c|stdexcept|class std::runtime_error|An error detectable only while running.
logic_error|c|stdexcept|class std::logic_error|An error in the program's logic.
invalid_argument|c|stdexcept|class std::invalid_argument|An argument was not acceptable.
out_of_range|c|stdexcept|class std::out_of_range|An index or key was outside the valid range.
domain_error|c|stdexcept|class std::domain_error|A value outside a function's domain.
length_error|c|stdexcept|class std::length_error|Something would exceed its maximum size.
overflow_error|c|stdexcept|class std::overflow_error|An arithmetic overflow.
bad_alloc|c|new|class std::bad_alloc|Thrown when new cannot obtain memory.
nothrow|k|new|std::nothrow|Makes new return nullptr on failure instead of throwing.
terminate|f|exception|void terminate()|Ends the program after an unhandled exception.
current_exception|f|exception|exception_ptr current_exception()|The exception being handled.
ifstream|c|fstream|class std::ifstream|Reads from a file.
ofstream|c|fstream|class std::ofstream|Writes to a file.
fstream|c|fstream|class std::fstream|Reads and writes a file.
stringstream|c|sstream|class std::stringstream|Reads from and writes to a string in memory.
istringstream|c|sstream|class std::istringstream|Reads values out of a string.
ostringstream|c|sstream|class std::ostringstream|Builds a string with <<.
ostream|c|ostream|class std::ostream|Any output stream: screen, file or string.
istream|c|istream|class std::istream|Any input stream.
streamsize|c|ios|std::streamsize|The type for counts of characters in streams.
ios|c|ios|class std::ios|Holds the stream flags: std::ios::app, binary, in, out.
format|f|format|std::string format(format_string, args...)|Builds a string from {} placeholders.
formatter|c|format|template struct std::formatter<T>|Specialize this to make your own type formattable.
format_to|f|format|format_to(output, format_string, args...)|Formats straight into an output iterator.
print|f|print|void print(format_string, args...)|Prints formatted text.
println|f|print|void println(format_string, args...)|Prints formatted text and ends the line.
mt19937|c|random|class std::mt19937|A good general-purpose random engine. Create one and keep it.
random_device|c|random|class std::random_device|An unpredictable seed from the operating system.
uniform_int_distribution|c|random|template class std::uniform_int_distribution<Int>|Whole numbers in a range, each equally likely.
uniform_real_distribution|c|random|template class std::uniform_real_distribution<Real>|Decimal numbers in a range.
bernoulli_distribution|c|random|class std::bernoulli_distribution|true or false with a given probability.
normal_distribution|c|random|template class std::normal_distribution<Real>|A bell curve.
thread|c|thread|class std::thread|A thread. Must be joined before it is destroyed.
jthread|c|thread|class std::jthread|A thread that joins automatically and can be asked to stop.
this_thread|n|thread|namespace std::this_thread|Functions that act on the current thread.
stop_token|c|stop_token|class std::stop_token|Lets a thread see that it has been asked to stop.
mutex|c|mutex|class std::mutex|Lets one thread at a time into a critical section.
lock_guard|c|mutex|template class std::lock_guard<Mutex>|Locks a mutex for the current scope.
scoped_lock|c|mutex|template class std::scoped_lock<Mutexes...>|Locks several mutexes together, without deadlock.
unique_lock|c|mutex|template class std::unique_lock<Mutex>|A lock that can be released early or moved.
shared_mutex|c|shared_mutex|class std::shared_mutex|Many readers or one writer.
shared_lock|c|shared_mutex|template class std::shared_lock<Mutex>|A reader's lock on a shared_mutex.
condition_variable|c|condition_variable|class std::condition_variable|Lets a thread sleep until notified.
atomic|c|atomic|template struct std::atomic<T>|A value whose operations are indivisible.
atomic_flag|c|atomic|struct std::atomic_flag|A lock-free boolean flag.
future|c|future|template class std::future<T>|A result that will be ready later.
promise|c|future|template class std::promise<T>|The writing end of a future.
async|f|future|std::future<R> async(std::launch policy, function, args...)|Runs a function, possibly on another thread.
launch|c|future|enum class std::launch|async or deferred.
packaged_task|c|future|template class std::packaged_task<R(Args...)>|A callable whose result goes to a future.
latch|c|latch|class std::latch|A one-shot countdown that threads can wait on.
barrier|c|barrier|template class std::barrier<F>|A reusable meeting point for threads.
counting_semaphore|c|semaphore|template class std::counting_semaphore<N>|Limits how many threads use something.
binary_semaphore|c|semaphore|std::binary_semaphore|A semaphore with one permit.
generator|c|generator|template class std::generator<T>|A coroutine that yields a sequence of values.
chrono|n|chrono|namespace std::chrono|Durations, clocks and time points.
filesystem|n|filesystem|namespace std::filesystem|Paths, directories and file information.
ranges|n|ranges|namespace std::ranges|Algorithms that take a whole container.
views|n|ranges|namespace std::views|Lazy pipelines: filter, transform, take ...
execution|n|execution|namespace std::execution|Policies for parallel algorithms: seq, par, par_unseq.
numbers|n|numbers|namespace std::numbers|Mathematical constants: pi, e, sqrt2.
literals|n|string|namespace std::literals|The standard literal suffixes: "text"s, 10ms.
integral|c|concepts|concept std::integral<T>|T is a whole-number type.
floating_point|c|concepts|concept std::floating_point<T>|T is a floating-point type.
same_as|c|concepts|concept std::same_as<T, U>|T and U are the same type.
convertible_to|c|concepts|concept std::convertible_to<From, To>|From converts to To.
derived_from|c|concepts|concept std::derived_from<D, B>|D is derived from B.
invocable|c|concepts|concept std::invocable<F, Args...>|F can be called with Args.
predicate|c|concepts|concept std::predicate<F, Args...>|F can be called and returns something like bool.
totally_ordered|c|concepts|concept std::totally_ordered<T>|T supports < > <= >=.
equality_comparable|c|concepts|concept std::equality_comparable<T>|T supports ==.
is_same_v|k|type_traits|bool is_same_v<T, U>|Whether two types are the same.
is_integral_v|k|type_traits|bool is_integral_v<T>|Whether T is a whole-number type.
is_floating_point_v|k|type_traits|bool is_floating_point_v<T>|Whether T is a floating-point type.
is_arithmetic_v|k|type_traits|bool is_arithmetic_v<T>|Whether T is a number type.
is_pointer_v|k|type_traits|bool is_pointer_v<T>|Whether T is a pointer.
is_trivially_copyable_v|k|type_traits|bool is_trivially_copyable_v<T>|Whether T can be copied as raw bytes.
remove_cvref_t|c|type_traits|remove_cvref_t<T>|T without const, volatile or a reference.
decay_t|c|type_traits|decay_t<T>|The type T becomes when passed by value.
enable_if_t|c|type_traits|enable_if_t<bool Condition, T = void>|T if the condition is true; otherwise no type (SFINAE).
conditional_t|c|type_traits|conditional_t<bool Condition, A, B>|A if true, otherwise B.
invoke_result_t|c|type_traits|invoke_result_t<F, Args...>|What calling F with Args returns.
true_type|c|type_traits|struct std::true_type|A type whose value is true.
false_type|c|type_traits|struct std::false_type|A type whose value is false.
index_sequence|c|utility|template struct std::index_sequence<Is...>|A compile-time list of indexes.
make_index_sequence|c|utility|make_index_sequence<N>|index_sequence<0, 1, ..., N-1>.
initializer_list|c|initializer_list|template class std::initializer_list<T>|What a braced list { 1, 2, 3 } is passed as.
source_location|c|source_location|struct std::source_location|The file and line of the calling code.
bit_cast|f|bit|To bit_cast<To>(const From& value)|Reinterprets the bits of one type as another, safely.
byteswap|f|bit|T byteswap(T value)|Reverses the order of the bytes.
endian|c|bit|enum class std::endian|little, big and native.
tie|f|tuple|tuple<Ts&...> tie(Ts&... values)|A tuple of references: for comparing or unpacking several values.
make_pair|f|utility|pair<A, B> make_pair(A a, B b)|Makes a pair.
make_tuple|f|tuple|tuple<Ts...> make_tuple(Ts... values)|Makes a tuple.
apply|f|tuple|apply(function, tuple)|Calls a function with a tuple's elements as arguments.
from_chars|f|charconv|from_chars(const char* first, const char* last, T& value)|Parses a number without throwing.
to_chars|f|charconv|to_chars(char* first, char* last, T value)|Writes a number as characters.
assert|f|cassert|assert(condition)|Stops the program if the condition is false (Debug builds only).
`,i=`
chrono|seconds|c|std::chrono::seconds|A number of seconds.
chrono|milliseconds|c|std::chrono::milliseconds|A number of milliseconds.
chrono|microseconds|c|std::chrono::microseconds|A number of microseconds.
chrono|nanoseconds|c|std::chrono::nanoseconds|A number of nanoseconds.
chrono|minutes|c|std::chrono::minutes|A number of minutes.
chrono|hours|c|std::chrono::hours|A number of hours.
chrono|days|c|std::chrono::days|A number of days.
chrono|duration|c|std::chrono::duration<Rep, Period>|A length of time.
chrono|duration_cast|f|To duration_cast<To>(duration d)|Converts a duration to a coarser unit, cutting off the rest.
chrono|steady_clock|c|std::chrono::steady_clock|A clock that never jumps. Use it to measure time.
chrono|system_clock|c|std::chrono::system_clock|The calendar clock.
chrono|high_resolution_clock|c|std::chrono::high_resolution_clock|The clock with the finest tick.
chrono|time_point|c|std::chrono::time_point<Clock>|A moment on a clock.
chrono|year_month_day|c|std::chrono::year_month_day|A calendar date.
chrono|sys_days|c|std::chrono::sys_days|A date as a time point, for arithmetic.
chrono|weekday|c|std::chrono::weekday|A day of the week.
this_thread|sleep_for|f|void sleep_for(duration d)|Pauses the current thread.
this_thread|sleep_until|f|void sleep_until(time_point t)|Pauses the current thread until a moment.
this_thread|get_id|f|std::thread::id get_id()|Identifies the current thread.
this_thread|yield|f|void yield()|Lets other threads run.
filesystem|path|c|class std::filesystem::path|A file path that understands its parts.
filesystem|exists|f|bool exists(const path& p)|Whether a file or directory exists.
filesystem|create_directories|f|bool create_directories(const path& p)|Creates a directory and its parents.
filesystem|file_size|f|std::uintmax_t file_size(const path& p)|The size of a file in bytes.
filesystem|remove|f|bool remove(const path& p)|Deletes a file or empty directory.
filesystem|rename|f|void rename(const path& from, const path& to)|Renames or moves.
filesystem|copy_file|f|bool copy_file(const path& from, const path& to)|Copies a file.
filesystem|current_path|f|path current_path()|The working directory.
filesystem|directory_iterator|c|class std::filesystem::directory_iterator|Walks the entries of one directory.
filesystem|recursive_directory_iterator|c|class std::filesystem::recursive_directory_iterator|Walks a directory and everything below it.
filesystem|is_directory|f|bool is_directory(const path& p)|Whether the path is a directory.
ranges|sort|f|void ranges::sort(range [, compare, projection])|Sorts a whole container.
ranges|find|f|iterator ranges::find(range, value [, projection])|The first element equal to value.
ranges|find_if|f|iterator ranges::find_if(range, predicate)|The first element satisfying the predicate.
ranges|count|f|ranges::count(range, value)|How many elements equal value.
ranges|count_if|f|ranges::count_if(range, predicate)|How many elements satisfy the predicate.
ranges|any_of|f|bool ranges::any_of(range, predicate)|True if any element satisfies the predicate.
ranges|all_of|f|bool ranges::all_of(range, predicate)|True if every element satisfies the predicate.
ranges|max_element|f|iterator ranges::max_element(range [, compare, projection])|An iterator to the largest element.
ranges|min_element|f|iterator ranges::min_element(range [, compare, projection])|An iterator to the smallest element.
ranges|minmax|f|ranges::minmax(range)|The smallest and largest values.
ranges|reverse|f|void ranges::reverse(range)|Reverses a container.
ranges|binary_search|f|bool ranges::binary_search(range, value)|Whether a sorted container holds value.
ranges|lower_bound|f|iterator ranges::lower_bound(range, value)|The first element not less than value.
ranges|to|f|ranges::to<Container>()|Collects a view into a container.
ranges|range_value_t|c|ranges::range_value_t<R>|The element type of a range.
views|filter|f|views::filter(predicate)|Keeps the elements that satisfy the predicate.
views|transform|f|views::transform(function)|Applies a function to each element.
views|take|f|views::take(n)|The first n elements.
views|drop|f|views::drop(n)|All but the first n elements.
views|take_while|f|views::take_while(predicate)|Elements until the predicate fails.
views|drop_while|f|views::drop_while(predicate)|Skips elements while the predicate holds.
views|reverse|k|views::reverse|Back to front.
views|iota|f|views::iota(first [, last])|Counts upwards, with no container.
views|keys|k|views::keys|The keys of a map.
views|values|k|views::values|The values of a map.
views|enumerate|k|views::enumerate|(index, element) pairs.
views|zip|f|views::zip(ranges...)|Elements of several ranges, paired up.
views|split|f|views::split(delimiter)|The pieces between delimiters.
views|join|k|views::join|Flattens a range of ranges.
views|chunk|f|views::chunk(n)|Groups of n elements.
execution|seq|k|std::execution::seq|Run sequentially.
execution|par|k|std::execution::par|Run on several threads.
execution|par_unseq|k|std::execution::par_unseq|Run on several threads and vectorize.
numbers|pi|k|inline constexpr double std::numbers::pi|3.14159...
numbers|e|k|inline constexpr double std::numbers::e|2.71828...
numbers|sqrt2|k|inline constexpr double std::numbers::sqrt2|1.41421...
`,a=`
seq|size|std::size_t size() const|The number of elements.
seq|empty|bool empty() const|Whether there are no elements.
seq|begin|iterator begin()|An iterator to the first element.
seq|end|iterator end()|The position one past the last element.
seq|front|T& front()|The first element. Undefined if empty.
seq|back|T& back()|The last element. Undefined if empty.
seq|clear|void clear()|Removes every element.
seq|at|T& at(std::size_t index)|Element at index, with a bounds check (throws std::out_of_range).
seq|data|T* data()|A pointer to the first element.
seq|rbegin|reverse_iterator rbegin()|Start of reverse iteration.
seq|rend|reverse_iterator rend()|End of reverse iteration.
seq|cbegin|const_iterator cbegin() const|A read-only begin.
seq|cend|const_iterator cend() const|A read-only end.
seq|swap|void swap(container& other)|Exchanges contents with another container.
vector|push_back|void push_back(const T& value)|Adds an element at the end.
vector|emplace_back|T& emplace_back(args...)|Constructs an element in place at the end.
vector|pop_back|void pop_back()|Removes the last element. Returns nothing.
vector|insert|iterator insert(iterator position, const T& value)|Inserts before a position.
vector|erase|iterator erase(iterator position)|Removes the element at a position.
vector|resize|void resize(std::size_t count)|Changes the number of elements.
vector|reserve|void reserve(std::size_t capacity)|Sets aside room, so later push_backs do not reallocate.
vector|capacity|std::size_t capacity() const|How many elements fit before more memory is needed.
vector|shrink_to_fit|void shrink_to_fit()|Asks to release unused capacity.
vector|assign|void assign(std::size_t count, const T& value)|Replaces the contents.
deque|push_back|void push_back(const T& value)|Adds an element at the end.
deque|push_front|void push_front(const T& value)|Adds an element at the front.
deque|pop_back|void pop_back()|Removes the last element.
deque|pop_front|void pop_front()|Removes the first element.
deque|insert|iterator insert(iterator position, const T& value)|Inserts before a position.
deque|erase|iterator erase(iterator position)|Removes the element at a position.
list|push_back|void push_back(const T& value)|Adds an element at the end.
list|push_front|void push_front(const T& value)|Adds an element at the front.
list|pop_back|void pop_back()|Removes the last element.
list|pop_front|void pop_front()|Removes the first element.
list|insert|iterator insert(iterator position, const T& value)|Inserts before a position.
list|erase|iterator erase(iterator position)|Removes the element at a position.
list|sort|void sort()|Sorts the list.
list|reverse|void reverse()|Reverses the list.
list|remove|void remove(const T& value)|Removes every element equal to value.
array|fill|void fill(const T& value)|Sets every element to value.
string|length|std::size_t length() const|The number of characters.
string|push_back|void push_back(char c)|Adds one character at the end.
string|pop_back|void pop_back()|Removes the last character.
string|append|std::string& append(const std::string& text)|Adds text at the end.
string|substr|std::string substr(std::size_t start, std::size_t count = npos) const|A copy of part of the string.
string|find|std::size_t find(const std::string& text, std::size_t from = 0) const|Where text first occurs, or std::string::npos.
string|rfind|std::size_t rfind(const std::string& text) const|Where text last occurs, or npos.
string|find_first_of|std::size_t find_first_of(const std::string& chars) const|The first position holding any of the characters.
string|find_first_not_of|std::size_t find_first_not_of(const std::string& chars) const|The first position holding none of the characters.
string|find_last_of|std::size_t find_last_of(const std::string& chars) const|The last position holding any of the characters.
string|insert|std::string& insert(std::size_t position, const std::string& text)|Inserts text at a position.
string|erase|std::string& erase(std::size_t start = 0, std::size_t count = npos)|Removes characters.
string|replace|std::string& replace(std::size_t start, std::size_t count, const std::string& text)|Replaces part of the string.
string|starts_with|bool starts_with(std::string_view prefix) const|Whether the string begins with prefix.
string|ends_with|bool ends_with(std::string_view suffix) const|Whether the string ends with suffix.
string|contains|bool contains(std::string_view text) const|Whether the string contains text.
string|compare|int compare(const std::string& other) const|Negative, zero or positive, like <=>.
string|c_str|const char* c_str() const|The text as a C-string, for C functions.
string|resize|void resize(std::size_t count)|Changes the length.
string|reserve|void reserve(std::size_t capacity)|Sets aside room.
string|capacity|std::size_t capacity() const|Room before reallocation.
string|npos|static const std::size_t npos|The "not found" value returned by find.
string_view|length|std::size_t length() const|The number of characters.
string_view|substr|std::string_view substr(std::size_t start, std::size_t count = npos) const|A view of part of the text.
string_view|find|std::size_t find(std::string_view text) const|Where text first occurs, or npos.
string_view|starts_with|bool starts_with(std::string_view prefix) const|Whether it begins with prefix.
string_view|ends_with|bool ends_with(std::string_view suffix) const|Whether it ends with suffix.
string_view|remove_prefix|void remove_prefix(std::size_t n)|Drops the first n characters from the view.
string_view|remove_suffix|void remove_suffix(std::size_t n)|Drops the last n characters from the view.
assoc|size|std::size_t size() const|The number of elements.
assoc|empty|bool empty() const|Whether there are no elements.
assoc|begin|iterator begin()|An iterator to the first element.
assoc|end|iterator end()|The position one past the last element.
assoc|clear|void clear()|Removes every element.
assoc|find|iterator find(const Key& key)|The element with that key, or end().
assoc|contains|bool contains(const Key& key) const|Whether the key is present.
assoc|count|std::size_t count(const Key& key) const|How many elements have that key.
assoc|erase|std::size_t erase(const Key& key)|Removes the element with that key.
assoc|insert|pair<iterator, bool> insert(const value_type& value)|Inserts if the key is absent.
assoc|emplace|pair<iterator, bool> emplace(args...)|Constructs an element in place if the key is absent.
map|at|Value& at(const Key& key)|The value for a key. Throws if the key is absent.
map|try_emplace|pair<iterator, bool> try_emplace(const Key& key, args...)|Inserts only if the key is absent.
map|insert_or_assign|pair<iterator, bool> insert_or_assign(const Key& key, Value value)|Inserts or overwrites.
map|lower_bound|iterator lower_bound(const Key& key)|The first element with a key not less than key.
map|upper_bound|iterator upper_bound(const Key& key)|The first element with a key greater than key.
set|lower_bound|iterator lower_bound(const T& value)|The first element not less than value.
set|upper_bound|iterator upper_bound(const T& value)|The first element greater than value.
pair|first|A first|The first value.
pair|second|B second|The second value.
optional|has_value|bool has_value() const|Whether a value is present.
optional|value|T& value()|The value. Throws std::bad_optional_access if empty.
optional|value_or|T value_or(T fallback) const|The value, or the fallback if empty.
optional|reset|void reset()|Makes it empty.
optional|emplace|T& emplace(args...)|Constructs a new value in place.
variant|index|std::size_t index() const|Which alternative is held.
variant|valueless_by_exception|bool valueless_by_exception() const|Whether it lost its value to an exception.
ptr|get|T* get() const|The raw pointer. Does not give up ownership.
ptr|reset|void reset(T* p = nullptr)|Deletes the object and takes a new one.
unique_ptr|release|T* release()|Gives up ownership and returns the raw pointer.
shared_ptr|use_count|long use_count() const|How many shared_ptr objects own this.
weak_ptr|lock|std::shared_ptr<T> lock() const|A shared_ptr to the object, or an empty one if it is gone.
weak_ptr|expired|bool expired() const|Whether the object has been destroyed.
stream|good|bool good() const|No error flags are set.
stream|fail|bool fail() const|The last operation failed.
stream|eof|bool eof() const|The end of the input was reached.
stream|clear|void clear()|Resets the error flags.
istream|ignore|std::istream& ignore(std::streamsize count, int delimiter)|Discards characters.
istream|get|int get()|Reads one character, including whitespace.
istream|peek|int peek()|Looks at the next character without reading it.
istream|unget|std::istream& unget()|Puts the last character back.
istream|read|std::istream& read(char* buffer, std::streamsize count)|Reads raw bytes.
istream|seekg|std::istream& seekg(position)|Moves the read position.
istream|tellg|position tellg()|The read position.
ostream|write|std::ostream& write(const char* buffer, std::streamsize count)|Writes raw bytes.
ostream|flush|std::ostream& flush()|Writes out buffered output.
ostream|seekp|std::ostream& seekp(position)|Moves the write position.
ostream|tellp|position tellp()|The write position.
ostream|precision|std::streamsize precision(std::streamsize digits)|Sets the number of digits printed.
file|open|void open(const std::string& path)|Opens a file.
file|close|void close()|Closes the file now.
file|is_open|bool is_open() const|Whether a file is open.
sstream|str|std::string str() const|The text built so far.
thread|join|void join()|Waits for the thread to finish.
thread|detach|void detach()|Lets the thread run on its own.
thread|joinable|bool joinable() const|Whether the thread can still be joined.
thread|get_id|std::thread::id get_id() const|The thread's id.
jthread|request_stop|bool request_stop()|Asks the thread to stop.
jthread|get_stop_token|std::stop_token get_stop_token()|The token the thread checks.
stop_token|stop_requested|bool stop_requested() const|Whether a stop has been asked for.
mutex|lock|void lock()|Locks. Prefer std::lock_guard.
mutex|unlock|void unlock()|Unlocks. Prefer std::lock_guard.
mutex|try_lock|bool try_lock()|Locks if it can do so without waiting.
unique_lock|unlock|void unlock()|Releases the mutex early.
unique_lock|lock|void lock()|Locks again.
unique_lock|owns_lock|bool owns_lock() const|Whether it currently holds the mutex.
condition_variable|wait|void wait(std::unique_lock<std::mutex>& lock, predicate)|Sleeps until notified and the predicate is true.
condition_variable|notify_one|void notify_one()|Wakes one waiting thread.
condition_variable|notify_all|void notify_all()|Wakes every waiting thread.
atomic|load|T load() const|Reads the value.
atomic|store|void store(T value)|Writes the value.
atomic|exchange|T exchange(T value)|Writes a value and returns the old one.
atomic|fetch_add|T fetch_add(T amount)|Adds and returns the old value.
atomic|fetch_sub|T fetch_sub(T amount)|Subtracts and returns the old value.
atomic|compare_exchange_weak|bool compare_exchange_weak(T& expected, T desired)|Stores desired only if the value equals expected.
atomic|compare_exchange_strong|bool compare_exchange_strong(T& expected, T desired)|Like the weak form, without spurious failures.
future|get|T get()|Waits for the result and returns it. Once only.
future|wait|void wait() const|Waits for the result.
future|valid|bool valid() const|Whether there is a result to get.
promise|set_value|void set_value(const T& value)|Delivers the result.
promise|get_future|std::future<T> get_future()|The future connected to this promise.
exception|what|const char* what() const|A message describing the error.
path|filename|path filename() const|The last part of the path.
path|stem|path stem() const|The file name without its extension.
path|extension|path extension() const|The extension, with its dot.
path|parent_path|path parent_path() const|Everything before the file name.
path|string|std::string string() const|The path as a string.
function|operator()|R operator()(Args... args) const|Calls the stored callable.
bitset|set|bitset& set(std::size_t position)|Switches a bit on.
bitset|reset|bitset& reset(std::size_t position)|Switches a bit off.
bitset|flip|bitset& flip(std::size_t position)|Toggles a bit.
bitset|test|bool test(std::size_t position) const|Whether a bit is on.
bitset|count|std::size_t count() const|How many bits are on.
bitset|to_string|std::string to_string() const|The bits as text.
stack|push|void push(const T& value)|Adds on top.
stack|pop|void pop()|Removes the top. Returns nothing.
stack|top|T& top()|The top element.
stack|size|std::size_t size() const|The number of elements.
stack|empty|bool empty() const|Whether it is empty.
queue|push|void push(const T& value)|Adds at the back.
queue|pop|void pop()|Removes the front. Returns nothing.
queue|front|T& front()|The oldest element.
queue|back|T& back()|The newest element.
queue|size|std::size_t size() const|The number of elements.
queue|empty|bool empty() const|Whether it is empty.
engine|seed|void seed(value)|Restarts the sequence from a seed.
span|subspan|span subspan(std::size_t offset, std::size_t count)|A view of part of the span.
span|first|span first(std::size_t count)|The first count elements.
span|last|span last(std::size_t count)|The last count elements.
`,o={vector:[`vector`,`seq`],array:[`array`,`seq`],deque:[`deque`,`seq`],list:[`list`,`seq`],span:[`span`,`seq`],string:[`string`,`seq`],string_view:[`string_view`,`seq`],wstring:[`string`,`seq`],map:[`map`,`assoc`],unordered_map:[`map`,`assoc`],multimap:[`map`,`assoc`],set:[`set`,`assoc`],unordered_set:[`assoc`],multiset:[`set`,`assoc`],pair:[`pair`],optional:[`optional`],variant:[`variant`],expected:[`optional`],unique_ptr:[`unique_ptr`,`ptr`],shared_ptr:[`shared_ptr`,`ptr`],weak_ptr:[`weak_ptr`],ostream:[`ostream`,`stream`],istream:[`istream`,`stream`],ifstream:[`file`,`istream`,`stream`],ofstream:[`file`,`ostream`,`stream`],fstream:[`file`,`istream`,`ostream`,`stream`],stringstream:[`sstream`,`istream`,`ostream`,`stream`],istringstream:[`sstream`,`istream`,`stream`],ostringstream:[`sstream`,`ostream`,`stream`],thread:[`thread`],jthread:[`jthread`,`thread`],stop_token:[`stop_token`],mutex:[`mutex`],shared_mutex:[`mutex`],unique_lock:[`unique_lock`],condition_variable:[`condition_variable`],atomic:[`atomic`],future:[`future`],promise:[`promise`],exception:[`exception`],runtime_error:[`exception`],logic_error:[`exception`],invalid_argument:[`exception`],out_of_range:[`exception`],path:[`path`],function:[`function`],bitset:[`bitset`],stack:[`stack`],queue:[`queue`],priority_queue:[`stack`],mt19937:[`engine`]},s={cout:`ostream`,cerr:`ostream`,clog:`ostream`,cin:`istream`},c=`
int|A whole number, usually 4 bytes: about -2.1 to +2.1 billion.|2.02
double|A number with a decimal point: about 15 significant digits. The default for decimals.|2.03
float|A decimal number with about 7 significant digits. Prefer double.|2.03
char|One character, stored as a small number.|2.04
bool|true or false.|2.04
void|"Nothing": a function that returns no value.|1.07
auto|Let the compiler work out the type from the initializer. Drops const and references.|4.07
const|This value will not change after it is set. The compiler enforces it.|2.06
constexpr|This value (or function result) can be worked out by the compiler, before the program runs.|2.06
consteval|This function must be evaluated by the compiler.|11.04
constinit|This static variable is initialized at compile time, but may change later.|11.04
static|On a local: keeps its value between calls. On a global: private to this file. In a class: shared by all objects.|3.06
inline|This definition may appear in several files; they are all the same one.|3.06
extern|This is defined in another file.|3.06
if|Runs a block only when a condition is true.|3.01
else|What to do when the if condition was false.|3.01
switch|Jumps to the case that matches one value.|3.02
case|A label inside a switch. Remember break.|3.02
default|Where a switch goes when no case matches. Also: ask the compiler to generate a special member (= default).|3.02
break|Leaves the nearest loop or switch.|3.03
continue|Skips to the next round of the loop.|3.03
for|A counting loop, or a loop over every element of a container.|3.03
while|Repeats while a condition is true. Tested before each round.|3.03
do|Starts a do-while loop: the body runs at least once.|3.03
return|Ends the function and hands a value back to the caller.|1.07
goto|Jumps to a label. Almost never the right tool.|3.08
struct|A type that bundles data. Members are public by default.|4.06
class|A type that bundles data with the functions that protect it. Members are private by default.|6.01
enum|A type with a fixed list of named values. Prefer enum class.|4.05
union|Several members sharing one piece of memory. Prefer std::variant.|13.02
namespace|A named group that keeps names from clashing.|3.05
using|Brings a name into scope, or gives a type another name.|4.07
typedef|The older way to give a type another name. Prefer using.|4.07
template|A pattern from which the compiler generates functions or classes for each type.|4.02
typename|Introduces a type parameter, or tells the compiler a dependent name is a type.|4.02
concept|A named requirement on template arguments.|9.04
requires|States a constraint on a template, or tests whether code would compile.|9.04
public|Usable by any code.|6.01
private|Usable only by the class's own member functions.|6.01
protected|Usable by the class and classes derived from it.|8.02
friend|Grants a function or class access to private members.|6.05
virtual|The version called is chosen by the object's real type, at run time.|8.03
override|Checks that this function really overrides a virtual one in the base class.|8.03
final|Nothing may override this function, or derive from this class.|8.03
explicit|This constructor or conversion must be asked for; it will not happen silently.|6.02
operator|Defines what an operator such as + or == means for your type.|6.07
this|A pointer to the object a member function was called on.|6.04
mutable|This member may change even in a const member function.|6.04
new|Allocates an object on the heap. Prefer std::make_unique.|7.02
delete|Releases an object made with new. Also: forbid a function (= delete).|7.02
nullptr|A pointer that points at nothing.|4.04
sizeof|The size of a type or object, in bytes.|2.01
alignof|The alignment a type requires.|13.02
alignas|Requests a stricter alignment.|13.02
decltype|The type of an expression.|4.07
static_cast|Converts on purpose between related types. Cuts off decimals; does not round.|2.05
dynamic_cast|Converts down a class hierarchy, checking at run time.|8.06
const_cast|Adds or removes const. Rarely justified.|2.05
reinterpret_cast|Treats bits as another type. Dangerous; prefer std::bit_cast.|13.01
try|Starts a block whose exceptions the following catch handlers may handle.|9.05
catch|Handles an exception of a matching type. Catch by const reference.|9.05
throw|Raises an exception. The current function stops at once.|9.05
noexcept|Promises that a function does not throw.|9.06
static_assert|A check done by the compiler. If it is false, the program does not build.|3.07
true|The bool value for "yes". Converts to 1.|2.04
false|The bool value for "no". Converts to 0.|2.04
unsigned|A whole number that cannot be negative. Wraps round at the ends.|2.02
signed|A whole number that can be negative. The default for int.|2.02
long|A larger whole number. long long is at least 64 bits.|2.02
short|A smaller whole number, usually 2 bytes.|2.02
co_yield|Hands out a value from a coroutine and pauses it.|12.07
co_await|Pauses a coroutine until an operation is ready.|12.07
co_return|Finishes a coroutine.|12.07
thread_local|Every thread gets its own copy of this variable.|12.01
volatile|Tells the compiler not to optimize away accesses. Not for threads: use std::atomic.|12.05
export|Makes a declaration visible to code that imports the module.|13.05
import|Brings in a module.|13.05
module|Declares which module this file belongs to.|13.05
`;function l(e){return e.split(`
`).map(e=>e.trim()).filter(Boolean).map(e=>e.split(`|`))}var u=new Map;for(let[e,t,n,i,a]of l(r))u.set(e,{name:e,kind:t,header:n,signature:i,doc:a,ns:`std`});var d=new Map;for(let[e,t,n,r,a]of l(i))d.has(e)||d.set(e,new Map),d.get(e).set(t,{name:t,kind:n,signature:r,doc:a,ns:`std::${e}`,header:(u.get(e)||{}).header||e});var f=new Map;for(let[e,t,n,r]of l(a))f.has(e)||f.set(e,[]),f.get(e).push({name:t,signature:n,doc:r,isFunction:/\(/.test(n)});var p=new Map;for(let[e,t,n]of l(c))p.set(e,{doc:t,lesson:n});function m(e){let t=o[e];if(!t)return[];let n=new Set,r=[];for(let e of t)for(let t of f.get(e)||[])n.has(t.name)||(n.add(t.name),r.push(t));return r}function h(e){return!!o[e]}var g=[...new Set([...u.values()].map(e=>e.header)),`cassert`,`cstdio`,`ctime`,`climits`,`cfloat`,`compare`,`coroutine`,`memory_resource`,`numbers`,`ranges`,`regex`,`stop_token`,`version`,`typeinfo`].sort(),_=[...new Set([`seq`,`vector`,`string`,`assoc`,`map`,`pair`,`optional`,`ptr`].flatMap(e=>(f.get(e)||[]).map(e=>e.name)))],v=`alignas alignof and auto bool break case catch char char8_t char16_t char32_t class co_await co_return co_yield concept const consteval constexpr constinit const_cast continue decltype default delete do double dynamic_cast else enum explicit export extern false final float for friend goto if import inline int long module mutable namespace new noexcept not nullptr operator or override private protected public reinterpret_cast requires return short signed sizeof static static_assert static_cast struct switch template this thread_local throw true try typedef typeid typename union unsigned using virtual void volatile wchar_t while xor`.split(` `),y=new Set(v),b=new Set(`auto bool char char8_t char16_t char32_t double float int long short signed unsigned void wchar_t`.split(` `)),x=new Set(`if.for.while.switch.catch.return.sizeof.alignof.decltype.static_assert.throw.requires.noexcept.alignas.typeid.assert.defined.else.do.new.delete.co_await.co_return.co_yield.static_cast.dynamic_cast.const_cast.reinterpret_cast`.split(`.`)),S=/^(?:static|virtual|inline|constexpr|consteval|constinit|explicit|friend|extern|export|\[\[[^\]]*\]\])\s*/,C=/[A-Za-z0-9_]/;function w(e){let t=e.length,n=e.split(``),r=new Uint8Array(t),i=t=>{e.charCodeAt(t)!==10&&(n[t]=` `),r[t]=1},a=0;for(;a<t;){let n=e[a],r=e[a+1];if(n===`/`&&r===`/`)for(;a<t&&e[a]!==`
`;)i(a++);else if(n===`/`&&r===`*`){let n=e.indexOf(`*/`,a+2),r=n<0?t:n+2;for(;a<r;)i(a++)}else if(n===`"`){let n=a>0&&e[a-1]===`R`?/^"([^()\\\s]{0,16})\(/.exec(e.slice(a,a+20)):null;if(n){let r=`)`+n[1]+`"`,o=e.indexOf(r,a+n[0].length),s=o<0?t:o+r.length-1;for(let e=a+1;e<s;e++)i(e);a=s+1}else{for(a++;a<t&&e[a]!==`"`&&e[a]!==`
`;)e[a]===`\\`&&a+1<t&&i(a++),i(a++);a++}}else if(n===`'`){let n=a>0&&C.test(e[a-1])&&C.test(r||``)&&e[a+2]!==`'`;if(a++,n)continue;for(;a<t&&e[a]!==`'`&&e[a]!==`
`;)e[a]===`\\`&&a+1<t&&i(a++),i(a++);a++}else a++}return{code:n.join(``),mask:r}}function T(e,t,n=`(`,r=`)`){let i=0;for(let a=t;a<e.length;a++)if(e[a]===n)i++;else if(e[a]===r&&--i===0)return a;return-1}function E(e,t){let n=e[t],r=n===`)`?`(`:n===`]`?`[`:n===`}`?`{`:`<`,i=0;for(let a=t;a>=0;a--)if(e[a]===n)i++;else if(e[a]===r&&--i===0)return a;return-1}function D(e,t=`,`){let n=[],r=0,i=0;for(let a=0;a<e.length;a++){let o=e[a];o===`(`||o===`[`||o===`{`||o===`<`?r++:o===`)`||o===`]`||o===`}`||o===`>`&&e[a-1]!==`-`?r=Math.max(0,r-1):o===t&&r===0&&(n.push(e.slice(i,a)),i=a+1)}return n.push(e.slice(i)),n}function O(e){let t=0,n=[];for(;;){let r=/^\s*template\s*</.exec(e.slice(t));if(!r)break;let i=t+r[0].length-1,a=T(e,i,`<`,`>`);if(a<0)break;for(let t of D(e.slice(i+1,a))){let e=/(?:typename|class|auto|[\w:]+)\s*(?:\.\.\.)?\s*([A-Za-z_]\w*)\s*(?:=.*)?$/.exec(t.trim());(e&&/^(typename|class)\b/.test(t.trim())||e&&/^[\w:]+\s+[A-Za-z_]\w*$/.test(t.trim())===!1&&/\b([A-Za-z_]\w*)\s+([A-Za-z_]\w*)\s*$/.test(t.trim()))&&n.push(e[1])}t=a+1}let r=/^\s*requires\s+[^;{]*?(?=\b(?:auto|void|int|bool|double|constexpr|static|inline|[A-Z]\w*)\b)/.exec(e.slice(t));return t&&r&&(t+=r[0].length),{cut:t,params:n}}function k(e){let t=[];for(let n of D(e)){let e=n.replace(/\s+/g,` `).trim();if(!e||e===`void`)continue;if(e===`...`){t.push({text:e,type:`...`,name:``});continue}let r=D(e,`=`),i=r[0].trim(),a=/^([\s\S]*[\s*&>\]])([A-Za-z_]\w*)(\s*\[[^\]]*\])?$/.exec(i);a&&!y.has(a[2])?t.push({text:e,type:a[1].trim(),name:a[2],fallback:r.length>1?r.slice(1).join(`=`).trim():``}):t.push({text:e,type:i,name:``})}return t}function A(e){let t=/\boperator\s*(?:\(\s*\)|\[\s*\]|""\s*\w+|[^\s\w(]+|\s+[\w:<>*&\s]+?)\s*\(/.exec(e);if(t)return{paren:t.index+t[0].length-1,nameStart:t.index};let n=0;for(let t=0;t<e.length;t++){let r=e[t];if(r===`<`)n++;else if(r===`>`)n>0&&e[t-1]!==`-`&&n--;else if(r===`(`&&n===0)return{paren:t}}let r=e.indexOf(`(`);return r<0?null:{paren:r}}function j(e){let t=O(e),n=e.slice(t.cut).trim(),r=A(n);if(!r)return null;let i=T(n,r.paren);if(i<0)return null;let a=n.slice(0,r.paren).trimEnd(),o=n.slice(i+1).trim(),s;if(r.nameStart!==void 0)s=r.nameStart;else{let e=/(?:[A-Za-z_]\w*(?:<[^<>()]*>)?\s*::\s*)*~?\s*[A-Za-z_]\w*$/.exec(a);if(!e)return null;s=e.index}if(r.nameStart!==void 0){let e=/(?:[A-Za-z_]\w*(?:<[^<>()]*>)?\s*::\s*)+$/.exec(a.slice(0,s));e&&(s=e.index)}let c=a.slice(s).replace(/\s+/g,``),l=c.replace(/^(?:[A-Za-z_]\w*(?:<[^<>()]*>)?::)+/,``);if(x.has(l)||y.has(l))return{control:!0};if(o&&!/^(?:const\b|noexcept\b|override\b|final\b|mutable\b|volatile\b|->|:(?!:)|requires\b|&|=|try\b)/.test(o))return null;let u=a.slice(0,s).trim();if(/[=(){};]/.test(u.replace(/\[\[[^\]]*\]\]/g,``).replace(/decltype\s*\(\s*auto\s*\)/g,`auto`)))return null;let d={};for(;;){let e=S.exec(u);if(!e)break;let t=e[0].trim();/^\w+$/.test(t)&&(d[t]=!0),u=u.slice(e[0].length)}u=u.replace(/\s+/g,` `).trim();let f=/^(?:const\s*|noexcept\s*|mutable\s*)*->\s*([^{;=]+?)\s*(?:requires\b.*)?$/.exec(o);f&&(u===`auto`||!u)&&(u=f[1].trim());let p=/^((?:[A-Za-z_]\w*(?:<[^<>()]*>)?::)+)/.exec(c),m=p?p[1].replace(/::$/,``).split(`::`).pop().replace(/<.*$/,``):``,h=n.slice(r.paren+1,i);return{name:l,owner:m,returnType:u,params:k(h),paramText:h.replace(/\s+/g,` `).trim(),isConst:/^const\b/.test(o),isStatic:!!d.static,isVirtual:!!d.virtual||/\boverride\b/.test(o),isPure:/=\s*0\s*$/.test(o),isDeleted:/=\s*delete\s*$/.test(o),templateParams:t.params,nameAt:t.cut+(e.slice(t.cut).length-e.slice(t.cut).trimStart().length)+a.lastIndexOf(l),parenAt:t.cut+(e.slice(t.cut).length-e.slice(t.cut).trimStart().length)+r.paren}}function M(e){let t=e.replace(/^\s*(?:(?:public|private|protected)\s*:\s*)+/,``).trim();if(!t)return{kind:`scope`};if(/^(?:else|do|try)$/.test(t)||/(?:^|[^\w:])(?:case\b[^{}?]*|default\s*):\s*$/.test(t))return{kind:`control`};let n;if((n=/\benum\s+(?:(class|struct)\s+)?([A-Za-z_]\w*)?\s*(?::[^{(]*)?$/.exec(t))&&!/[()=]/.test(t))return{kind:`enum`,name:n[2]||``,scoped:!!n[1],keyword:`enum`};if((n=/\b(class|struct|union)\s+(?:\[\[[^\]]*\]\]\s*)?([A-Za-z_]\w*)\s*(?:<[^{]*>\s*)?(?:final\s*)?(?::\s*([^{]*))?$/.exec(t))&&!/\)\s*$/.test(t.slice(0,n.index))){let e=n[3]?D(n[3]).map(e=>e.replace(/\b(?:public|private|protected|virtual)\b/g,``).trim().replace(/<.*$/,``).split(`::`).pop()).filter(Boolean):[];return{kind:`class`,name:n[2],keyword:n[1],bases:e,templateParams:O(t).params}}if(n=/\bnamespace\b\s*([\w:]*)\s*$/.exec(t))return{kind:`namespace`,name:n[1]};let r=/\]\s*(?:\(([^()]*(?:\([^()]*\)[^()]*)*)\))?\s*(?:(?:mutable|constexpr|noexcept)\s*)*(?:->\s*[^{;]+)?$/.exec(t);if(r){let e=E(t,t.indexOf(`]`,r.index)),n=e>0?t.slice(0,e).trimEnd().slice(-1):``;if(e>=0&&!C.test(n)&&n!==`]`)return{kind:`lambda`,params:k(r[1]||``)};if(!r[1]&&r[1]!==``)return{kind:`init`}}let i=j(t);return i?i.control?{kind:`control`}:{kind:`function`,fn:i}:{kind:`init`}}function ee(e){let t=[],n=[],r=new Map,i=new Map;for(let a=0;a<e.length;a++){let o=e.charCodeAt(a);if(o===123){let o=0,s=a-1;for(;s>=0;s--){let t=e[s];if(t===`)`||t===`]`)o++;else if(t===`(`||t===`[`){if(o===0)break;o--}else if(o===0){if(t===`;`||t===`{`)break;if(t===`}`){let t=r.get(s);if(t&&t.kind===`init`&&/^\s*[,{]/.test(e.slice(s+1,a+1))){s=t.open;continue}break}}}let c=s+1,l=M(e.slice(c,a)),u={open:a,close:e.length,parent:n.length?n[n.length-1]:null,headStart:c,...l};t.push(u),i.set(a,u),n.push(u)}else if(o===125&&n.length){let e=n.pop();e.close=a,r.set(a,e)}}return{blocks:t,byOpen:i}}function te(e){for(;e&&e.kind===`init`;)e=e.parent;return e}var ne=`((?:(?:const|static|constexpr|constinit|inline|mutable|thread_local|volatile|extern)\\s+)*(?:(?:unsigned|signed|long|short)\\s+)*(?:[A-Za-z_]\\w*::)*[A-Za-z_]\\w*(?:\\s*<[^;{}()=]*?>)?(?:::[A-Za-z_]\\w*)*)(\\s*(?:const\\s*)?[*&]{1,2}\\s*(?:const\\s+)?|\\s+(?:const\\s+)?)([A-Za-z_]\\w*)\\s*(?=[;={(,)\\[]|:(?!:)|$)`,re=RegExp(`\\b`+ne,`g`),ie=RegExp(`^\\s*`+ne);function ae(e){let t=e.replace(/<[\s\S]*$/,``).match(/[A-Za-z_]\w*/g)||[];if(!t.length)return!1;let n=new Set([`const`,`static`,`constexpr`,`constinit`,`inline`,`mutable`,`thread_local`,`volatile`,`extern`]);return t.every(e=>n.has(e)||b.has(e)||!y.has(e))}function N(e,t){let n=e.lastIndexOf(`
`,t-1)+1,r=[];for(let t=0;t<12&&n>0;t++){let t=e.lastIndexOf(`
`,n-2)+1,i=e.slice(t,n-1).trim();if(i.startsWith(`//`))r.unshift(i.replace(/^\/\/[\/!]?\s?/,``));else if(i.endsWith(`*/`)){let t=e.lastIndexOf(`/*`,n);if(t<0)break;return e.slice(t,n).replace(/^\/\*+|\*+\/\s*$/g,``).split(`
`).map(e=>e.replace(/^\s*\*\s?/,``).trim()).filter(Boolean).join(`
`)}else if(!(/^template\b/.test(i)||/^\[\[/.test(i)))break;n=t}return r.join(`
`)}function oe(e){let t={src:e,includes:[],macros:[],types:[],functions:[],globals:[],locals:[],aliases:[],namespaces:new Set,templateParams:new Set,usingStd:!1,usingNames:new Set,usingNamespaces:new Set},n=w(e);t.mask=n.mask,t.code=n.code.replace(/^[ \t]*#[^\n]*(?:\\\r?\n[^\n]*)*/gm,(n,r)=>{let i=e.slice(r,r+n.length),a=/^[ \t]*#\s*include\s*([<"])([^>"\n]+)[>"]/.exec(i);a&&t.includes.push({name:a[2].trim(),system:a[1]===`<`,offset:r});let o=/^[ \t]*#\s*define\s+([A-Za-z_]\w*)(\([^)]*\))?[ \t]*(.*)/.exec(i);return o&&t.macros.push({name:o[1],params:o[2]||``,value:o[3].trim().slice(0,80),offset:r+i.indexOf(o[1])}),n.replace(/[^\n\r]/g,` `)});let{code:r}=t;/^\s*import\s+std\s*;/m.test(r)&&(t.importsStd=!0);let i=ee(r);t.blocks=i.blocks,t.byOpen=i.byOpen;let a=(e,t)=>{if(!e)return;let n=t.match(/\b(public|private|protected)\s*:(?!:)/g);n&&(e.access=n[n.length-1].replace(/\s*:$/,``))},o=(n,i,a,o,s)=>{let c=!n.returnType;if(c){let e=n.name.replace(/^~/,``);if(!(o&&e===o.name)&&!(n.owner&&e===n.owner)&&!/^operator/.test(n.name))return null}let l={...n,kind:`function`,offset:i+n.nameAt,block:a||null,isDefinition:!!a,ns:s,owner:o?o.name:n.owner,inClass:!!o,access:o?o.access:`public`,isConstructor:c&&!n.name.startsWith(`~`)&&!/^operator/.test(n.name),doc:N(e,i+n.nameAt)};if(l.signature=se(l),o?o.methods.push(l):t.functions.push(l),a){let e=r.slice(a.headStart,a.open);for(let r of n.params){if(!r.name)continue;let n=RegExp(`\\b`+r.name+`\\b(?![\\s\\S]*\\b`+r.name+`\\b)`).exec(e.slice(0,e.lastIndexOf(`)`)+1));t.locals.push({kind:`param`,name:r.name,type:r.type,offset:a.headStart+(n?n.index:0),scope:a,fn:l})}a.fnEntry=l}return l},s=(n,i,a,o)=>{let s=ie.exec(n);if(!s||!ae(s[1])||y.has(s[3]))return;let c=(s[1]+s[2]).replace(/\s+/g,` `).trim(),l=(n,i,s)=>{let l={kind:a?`member`:`global`,name:n,type:s,offset:i,scope:null,owner:a?a.name:``,ns:o,access:a?a.access:`public`,isStatic:/\bstatic\b/.test(c),after:r.slice(i+n.length,i+n.length+200),doc:N(e,i)};a?a.members.push(l):t.globals.push(l)};if(i+s[0].length-s[0].trimEnd().length-s[3].length+(s[0].length-s[0].trimEnd().length,0),l(s[3],i+s[0].lastIndexOf(s[3]),c.replace(/\bstatic\s+/,``)),!/[(<{]/.test(n)){let e=D(n),t=i+e[0].length+1;for(let n of e.slice(1)){let e=/^\s*([*&]*)\s*([A-Za-z_]\w*)/.exec(n);e&&!y.has(e[2])&&l(e[2],t+n.indexOf(e[2]),(s[1]+e[1]).replace(/\s+/g,` `).trim()),t+=n.length+1}}},c=(e,n,r,i)=>{let c=/^(?:\s*(?:public|private|protected)\s*:)*\s*/.exec(e)[0].length;a(r,e.slice(0,c));let l=e.slice(c);if(n+=c,!l.trim())return;let u=O(l);for(let e of u.params)t.templateParams.add(e);let d,f=l.slice(u.cut).trimStart(),p=n+l.length-f.length;if(d=/^using\s+namespace\s+([\w:]+)/.exec(f)){d[1]===`std`&&(t.usingStd=!0),t.usingNamespaces.add(d[1]);return}if(d=/^using\s+([A-Za-z_]\w*)\s*=\s*([\s\S]+)$/.exec(f)){t.aliases.push({kind:`alias`,name:d[1],target:d[2].replace(/\s+/g,` `).trim(),offset:p+f.indexOf(d[1],5),ns:i});return}if(d=/^using\s+([\w:]+)::(\w+)\s*$/.exec(f)){d[1]===`std`&&t.usingNames.add(d[2]);return}if(d=/^typedef\s+([\s\S]+?)\s*\b([A-Za-z_]\w*)\s*$/.exec(f)){t.aliases.push({kind:`alias`,name:d[2],target:d[1].replace(/\s+/g,` `).trim(),offset:p+f.lastIndexOf(d[2]),ns:i});return}if(/^(?:friend|static_assert|return|import|module|export\s+import|export\s+module|extern\s+"|concept)\b/.test(f)||/^(?:class|struct|union|enum)\b[^(=]*$/.test(f))return;let m=j(l);if(m&&!m.control){for(let e of m.templateParams)t.templateParams.add(e);o(m,n,null,r,i)}else s(f,p,r,i)},l=(e,n,i,a)=>{let o=e;for(let s=e;s<n;s++){let e=r.charCodeAt(s);if(e===123){let e=t.byOpen.get(s);if(!e)continue;if(e.kind===`init`||e.kind===`lambda`){s=e.close;continue}u(e,i,a),s=e.close,o=s+1}else e===59&&(c(r.slice(o,s),o,i,a),o=s+1)}},u=(n,i,s)=>{let c=r.slice(n.headStart,n.open);if(a(i,(/^(?:\s*(?:public|private|protected)\s*:)*/.exec(c)||[``])[0]),n.kind===`namespace`)n.name&&t.namespaces.add(n.name.split(`::`).pop()),l(n.open+1,n.close,null,n.name||s);else if(n.kind===`class`){let r=n.headStart+RegExp(`\\b`+n.keyword+`\\s+(?:\\[\\[[^\\]]*\\]\\]\\s*)?`).exec(c).index,a=n.headStart+c.indexOf(n.name,r-n.headStart+n.keyword.length),o={kind:`type`,keyword:n.keyword,name:n.name,bases:n.bases,block:n,offset:a,access:n.keyword===`class`?`private`:`public`,members:[],methods:[],enumerators:[],ns:s,parent:i?i.name:``,doc:N(e,a),templateParams:n.templateParams||[]};for(let e of o.templateParams)t.templateParams.add(e);n.typeEntry=o,t.types.push(o),l(n.open+1,n.close,o,s)}else if(n.kind===`enum`){let a=n.name?n.headStart+c.lastIndexOf(n.name):n.headStart,o={kind:`type`,keyword:`enum`,scoped:n.scoped,name:n.name,bases:[],block:n,offset:a,members:[],methods:[],enumerators:[],ns:s,parent:i?i.name:``,doc:N(e,a)},l=n.open+1;for(let e of D(r.slice(n.open+1,n.close))){let t=/^\s*([A-Za-z_]\w*)\s*(?:=\s*([^,]+))?/.exec(e);t&&o.enumerators.push({kind:`enumerator`,name:t[1],offset:l+e.indexOf(t[1]),owner:n.name,scoped:n.scoped,value:(t[2]||``).trim()}),l+=e.length+1}n.typeEntry=o,t.types.push(o)}else if(n.kind===`function`){for(let e of n.fn.templateParams)t.templateParams.add(e);o(n.fn,n.headStart+c.length-c.replace(/^\s*(?:(?:public|private|protected)\s*:\s*)*/,``).length,n,i,s)}};l(0,r.length,null,``);let d=e=>{let n=null,r=null;for(let i of t.blocks)if(i.open>e){if(i.headStart<=e)r=i;else if(i.headStart>e&&i.open>e+4e3)break}else e<i.close&&(n=i);return{inner:te(n),head:r}};t.owning=d,re.lastIndex=0;let f;for(;f=re.exec(r);){if(!ae(f[1])||y.has(f[3]))continue;let e=f.index-1;for(;e>=0&&/\s/.test(r[e]);)e--;if(e>=0&&!`;{}(,:)`.includes(r[e]))continue;let n=f.index+f[0].lastIndexOf(f[3]),{inner:i,head:a}=d(n),o=null,s=a&&n>(a.kind===`lambda`?r.lastIndexOf(`]`,a.open):r.indexOf(`(`,a.headStart));if(s&&(a.kind===`control`||a.kind===`lambda`))o=a;else if(s&&a.kind===`function`)continue;else if(i&&(i.kind===`function`||i.kind===`control`||i.kind===`lambda`||i.kind===`scope`))o=i;else continue;if(t.locals.some(e=>e.offset===n))continue;let c=f.index+f[0].length;t.locals.push({kind:o===a&&a.kind===`lambda`?`param`:`local`,name:f[3],type:(f[1]+f[2]).replace(/\s+/g,` `).trim(),offset:n,scope:o,after:r.slice(c,c+240),end:c})}let p=/\bauto\s*&{0,2}\s*\[([^\]]+)\]\s*(?=:(?!:)|=|\{)/g;for(;f=p.exec(r);){let{inner:e,head:n}=d(f.index),i=n&&n.kind===`control`?n:e;if(!i)continue;let a=f.index+f[0].length,o=f.index+f[0].indexOf(`[`)+1;D(f[1]).forEach((e,n)=>{let s=e.trim();/^[A-Za-z_]\w*$/.test(s)&&t.locals.push({kind:`local`,name:s,type:`auto`,offset:o+e.indexOf(s),scope:i,after:r.slice(a,a+240),end:a,binding:n}),o+=e.length+1})}return t.locals.sort((e,t)=>e.offset-t.offset),t}function se(e){e.owner&&e.inClass;let t=e.params.map(e=>e.text).join(`, `),n=e.returnType?e.returnType+` `:``;return`${e.isStatic?`static `:``}${e.isVirtual&&e.inClass?`virtual `:``}${n}${e.name}(${t})${e.isConst?` const`:``}${e.isPure?` = 0`:``}`}function ce(e,t){let n=null;for(let r of e.blocks)r.kind===`function`&&r.headStart<=t&&t<=r.close&&(n=r);return n}function P(e){let{file:t,offset:n}=e,r=null;for(let e of t.blocks)e.kind===`class`&&e.open<n&&n<=e.close&&(r=e);let i=ce(t,n);return i&&i.fnEntry&&i.fnEntry.owner&&(!r||i.open>r.open)?F(e,i.fnEntry.owner):r?r.typeEntry:null}function F(e,t){if(!t)return null;let n=String(t).split(`::`).pop().replace(/<.*$/,``).trim();for(let t of[e.file,...e.files]){let e=t.types.find(e=>e.name===n);if(e)return e.file=t,e}return null}function le(e,t){for(let n of[e.file,...e.files]){let e=n.aliases.find(e=>e.name===t);if(e)return e.file=n,e}return null}function I(e,t,n){let r=[],i=new Set;for(let a of[e.file,...e.files])if(!i.has(a)){i.add(a);for(let e of a.functions)e.name===t&&(n===void 0||(e.owner||``)===(n||``))&&(e.file=a,r.push(e));for(let e of a.types)if(n===void 0||e.name===n)for(let n of e.methods)n.name===t&&(n.file=a,r.push(n))}return r}function L(e,t,n=new Set){if(!t||n.has(t.name))return{members:[],methods:[]};n.add(t.name);let r=t.members.map(e=>({...e,file:t.file})),i=t.methods.map(e=>({...e,file:t.file}));for(let a of t.bases||[]){let t=L(e,F(e,a),n);r.push(...t.members),i.push(...t.methods.filter(e=>!e.isConstructor&&!e.name.startsWith(`~`)))}return{members:r,methods:i}}function R(e){let{file:t,offset:n}=e,r=new Map;for(let e of t.locals){if(e.offset>=n&&e.kind!==`param`)break;let t=e.scope;if(!t)continue;let i=e.kind===`param`||t.headStart<=e.offset&&e.offset<t.open?t.headStart<=n&&n<=t.close:t.open<n&&n<=t.close;(i&&e.offset<n||i&&e.kind===`param`)&&r.set(e.name,e)}return r}function ue(e,t){for(let n of[e.file,...e.files]){let e=n.globals.find(e=>e.name===t);if(e)return e.file=n,e}return null}function de(e,t,n){for(let r of[e.file,...e.files])for(let e of r.types){if(n&&e.name!==n)continue;let i=e.enumerators.find(e=>e.name===t);if(i)return i.file=r,i}return null}var fe=new Set([`vector`,`array`,`deque`,`list`,`forward_list`,`set`,`multiset`,`unordered_set`,`span`,`stack`,`queue`,`priority_queue`,`optional`,`unique_ptr`,`shared_ptr`,`weak_ptr`,`initializer_list`,`atomic`,`future`,`promise`,`generator`,`expected`,`reference_wrapper`]),pe=new Set([`map`,`unordered_map`,`multimap`]),me=new Set([`unique_ptr`,`shared_ptr`,`optional`,`expected`]);function z(e){if(!e)return null;let t=String(e).replace(/\b(?:const|constexpr|constinit|static|inline|mutable|volatile|typename|struct|class|thread_local|extern)\b/g,` `).replace(/\s+/g,` `).trim(),n=0;for(;;)if(/\*$/.test(t))n++,t=t.slice(0,-1).trim();else if(/&$/.test(t))t=t.slice(0,-1).trim();else break;if(!t)return null;let r=t.indexOf(`<`),i=t,a=[];if(r>=0){let e=T(t,r,`<`,`>`);a=D(t.slice(r+1,e<0?t.length:e)).map(e=>e.trim()).filter(Boolean),i=t.slice(0,r)+(e>=0?t.slice(e+1):``)}let o=i.split(`::`).map(e=>e.trim()).filter(Boolean),s=o.pop()||``;return!s||s===`auto`?null:{name:s,ns:o.join(`::`),args:a,pointer:n}}function B(e,t,n=0){if(!t||n>4||t.name===`string`||h(t.name))return t;let r=le(e,t.name);if(!r)return t;let i=z(r.target);return i?(i.pointer+=t.pointer,B(e,i,n+1)):t}function he(e,t){return t=B(e,t),t?t.pointer?{...t,pointer:t.pointer-1}:pe.has(t.name)?{name:`pair`,ns:`std`,args:[t.args[0]||``,t.args[1]||``],pointer:0}:t.name===`string`||t.name===`string_view`?null:fe.has(t.name)?B(e,z(t.args[0])):null:null}function ge(e,t){return t=B(e,t),t?pe.has(t.name)?B(e,z(t.args[1])):he(e,t):null}function _e(e,t,n){let r=e.slice(0,e.indexOf(t)).trim();if(/std::string_view/.test(r))return z(`std::string_view`);if(/std::string\b/.test(r))return z(`std::string`);if(/^(?:const )?T[&*]?$/.test(r))return z(n.args[0]);if(/^Value&?$/.test(r))return z(n.args[1]);if(/^A$/.test(r))return z(n.args[0]);if(/^B$/.test(r))return z(n.args[1]);if(/^T\*$/.test(r)){let e=z(n.args[0]);return e&&e.pointer++,e}return/std::shared_ptr<T>/.test(r)?{name:`shared_ptr`,ns:`std`,args:[n.args[0]||``],pointer:0}:/^path$/.test(r)?z(`std::filesystem::path`):/^span$/.test(r)?n:null}function ve(e,t,n){if(t=B(e,t),!t)return null;let r=F(e,t.name);if(r){let{members:t,methods:i}=L(e,r),a=t.find(e=>e.name===n);if(a)return G({...e,file:a.file||e.file},a);let o=i.find(e=>e.name===n)||I(e,n,r.name)[0];return o?B(e,z(o.returnType)):null}let i=m(t.name).find(e=>e.name===n);return i?B(e,_e(i.signature,n,t)):null}function V(e,t){return t=B(e,t),t?t.pointer?{...t,pointer:t.pointer-1}:me.has(t.name)||t.name===`weak_ptr`?B(e,z(t.args[0])):t:null}function H(e,t){let n=[],r=t;for(let t=0;t<12;t++){for(;r>0&&/\s/.test(e[r-1]);)r--;let t=!1,i=!1,a=``;for(;r>0&&(e[r-1]===`)`||e[r-1]===`]`);){let n=E(e,r-1);if(n<0)return null;for(e[r-1]===`)`?(t=!0,a=e.slice(n+1,r-1)):i=!0,r=n;r>0&&/\s/.test(e[r-1]);)r--}let o=``;if(e[r-1]===`>`&&e[r-2]!==`-`){let t=E(e,r-1);t>=0&&C.test(e[t-1]||``)&&(o=e.slice(t+1,r-1),r=t)}let s=r;for(;s>0&&C.test(e[s-1]);)s--;let c=e.slice(s,r);if(!c||/^\d/.test(c))return n.length&&!t&&!i?n:null;for(n.unshift({name:c,call:t,index:i,targs:o,args:a,offset:s}),r=s;r>0&&/\s/.test(e[r-1]);)r--;if(e[r-1]===`.`&&e[r-2]!==`.`)n[0].op=`.`,r--;else if(e[r-1]===`>`&&e[r-2]===`-`)n[0].op=`->`,r-=2;else if(e[r-1]===`:`&&e[r-2]===`:`)n[0].op=`::`,r-=2;else break}return n}function ye(e,t){if(!e||!e.signature)return null;if((e.name===`make_unique`||e.name===`make_shared`)&&t.targs)return{name:e.name===`make_unique`?`unique_ptr`:`shared_ptr`,ns:`std`,args:[t.targs.trim()],pointer:0};if(e.kind===`c`)return{name:e.name,ns:`std`,args:t.targs?D(t.targs).map(e=>e.trim()):[],pointer:0};if(e.kind!==`f`)return null;let n=e.signature.slice(0,e.signature.indexOf(e.name+`(`)).trim();return/^std::string$/.test(n)?z(`std::string`):/^std::future<R>$/.test(n)?{name:`future`,ns:`std`,args:[``],pointer:0}:null}function be(e,t){let{name:n}=t,r=null;if(n===`this`){let t=P(e);return t?{name:t.name,ns:``,args:[],pointer:1}:null}if(!t.call){let i=R(e).get(n);if(i)r=G(e,i);else{let i=P(e),a=i?L(e,i).members.find(e=>e.name===n):null;if(a)r=G({...e,file:a.file||e.file},a);else{let i=ue(e,n);i?r=G({...e,file:i.file},i):s[n]?r={name:s[n],ns:`std`,args:[],pointer:0}:F(e,n)?r={name:n,ns:``,args:[],pointer:0,isTypeName:!0}:u.has(n)&&u.get(n).kind===`c`&&(r={name:n,ns:`std`,args:t.targs?D(t.targs).map(e=>e.trim()):[],pointer:0,isTypeName:!0})}}}else if(F(e,n))r={name:n,ns:``,args:[],pointer:0};else{let i=P(e),a=(i?L(e,i).methods.find(e=>e.name===n):null)||I(e,n)[0];a&&a.returnType&&a.returnType!==`auto`?r=B(e,z(a.returnType)):a||(r=ye(u.get(n),t))}return r&&t.index&&(r=ge(e,r)),r}function U(e,t){if(!t||!t.length)return null;let n=0;for(;n<t.length-1&&t[n+1].op===`::`&&!t[n].call&&(t[n].name===`std`||d.has(t[n].name)||e.file.namespaces.has(t[n].name)||e.files.some(e=>e.namespaces.has(t[n].name)));)n++;let r=n>0&&(t[n-1].name===`std`||d.has(t[n-1].name))?t[n].call?ye(u.get(t[n].name)||(d.get(t[n-1].name)||new Map).get(t[n].name),t[n]):s[t[n].name]?{name:s[t[n].name],ns:`std`,args:[],pointer:0}:h(t[n].name)||u.has(t[n].name)?{name:t[n].name,ns:`std`,args:t[n].targs?D(t[n].targs).map(e=>e.trim()):[],pointer:0,isTypeName:!t[n].call}:null:be(e,t[n]);for(n>0&&!r&&(r=be(e,t[n])),n++;n<t.length;n++){let i=t[n];if(!r)return null;if(i.op===`->`&&(r=V(e,r)),i.op===`::`){let t=F(e,r.name),n=F(e,i.name);r=n&&n.parent===r.name?{name:i.name,ns:``,args:[],pointer:0,isTypeName:!0}:t&&t.keyword===`enum`?{name:t.name,ns:``,args:[],pointer:0}:ve(e,r,i.name)}else r=ve(e,r,i.name);r&&i.index&&(r=ge(e,r))}return r?B(e,r):null}function W(e,t,n){let{code:r}=e.file;for(;t<n&&/\s/.test(r[t]);)t++;for(;n>t&&/\s/.test(r[n-1]);)n--;let i=r.slice(t,n);if(!i)return null;let a;if(a=/^new\s+([\w:]+(?:<[^;]*?>)?)/.exec(i)){let e=z(a[1]);return e&&e.pointer++,e}if(a=/^(?:static|dynamic|const|reinterpret)_cast\s*</.exec(i)){let t=T(i,a[0].length-1,`<`,`>`);return t>0?B(e,z(i.slice(a[0].length,t))):null}if(/^"/.test(i))return/"s$/.test(i)?z(`std::string`):null;if(i[0]===`&`){let r=W(e,t+1,n);return r?{...r,pointer:r.pointer+1}:null}if(i[0]===`*`)return V(e,W(e,t+1,n));if((a=/^((?:[A-Za-z_]\w*::)*[A-Za-z_]\w*(?:<[^;{}]*?>)?)\s*\{/.exec(i))&&i.endsWith(`}`)){let t=z(a[1]);if(t&&(F(e,t.name)||h(t.name)||le(e,t.name)))return B(e,t)}let o=H(r,n);return!o||!o.length||o[0].offset>t+1||o[0].offset<t?null:U(e,o)}function G(e,t){if(t.resolved!==void 0)return t.resolved;if(t.resolving)return null;t.resolving=!0;let n=null;try{let r=z(t.type);if(r&&t.binding===void 0)n=B(e,r);else if(t.after!==void 0){let{code:r}=e.file,i=/^\s*(:(?!:)|=|\{|\()/.exec(t.after),a=t.end===void 0?t.offset+t.name.length:t.end,o={...e,offset:t.offset},s=null;if(i&&i[1]===`:`){let t=0,n=a+i[0].length;for(;n<r.length;n++)if(r[n]===`(`)t++;else if(r[n]===`)`){if(t===0)break;t--}s=he(e,W(o,a+i[0].length,n))}else if(i&&i[1]===`=`){let e=0,t=a+i[0].length;for(;t<r.length;t++){let n=r[t];if(`([{`.includes(n))e++;else if(`)]}`.includes(n)){if(e===0)break;e--}else if((n===`;`||n===`,`)&&e===0)break}s=W(o,a+i[0].length,t)}else if(i&&(i[1]===`{`||i[1]===`(`)){let e=a+i[0].length-1,t=T(r,e,i[1],i[1]===`{`?`}`:`)`);t>0&&(s=W(o,e+1,t))}if(t.binding!==void 0&&s){if(s=B(e,s),s.name===`pair`||s.name===`tuple`)n=B(e,z(s.args[t.binding]));else{let r=F(e,s.name),i=r?r.members.filter(e=>!e.isStatic)[t.binding]:null;n=i?G({...e,file:r.file||e.file},i):null}}else t.binding===void 0&&(n=s)}}finally{t.resolving=!1}return t.resolved=n||null,t.resolved}function xe(e){if(!e)return``;let t=e.ns===`std`||h(e.name)||u.has(e.name)&&u.get(e.name).kind===`c`&&!e.ns;return`${e.ns?e.ns+`::`:t?`std::`:``}${e.name}${e.args&&e.args.length?`<`+e.args.join(`, `)+`>`:``}${`*`.repeat(e.pointer||0)}`}function Se(e,t){if(t=B(e,t),!t)return[];let n=F(e,t.name);if(n){let{members:t,methods:r}=L(e,n),i=t.map(e=>({name:e.name,signature:`${e.type} ${e.name}`,doc:e.doc||``,isFunction:!1,origin:e.owner,entry:e,access:e.access||`public`})),a=new Set;for(let t of[...r,...e.files.concat(e.file).flatMap(e=>e.functions.filter(e=>e.owner===n.name))]){if(t.isConstructor||t.name.startsWith(`~`)||/^operator/.test(t.name))continue;let e=t.name+`(`+t.paramText+`)`;a.has(e)||(a.add(e),i.push({name:t.name,signature:t.signature,doc:t.doc||``,isFunction:!0,origin:t.owner,entry:t,noArgs:!t.params.length,access:t.access||`public`}))}return i}return m(t.name).map(e=>({...e,origin:`std::`+t.name,noArgs:/\(\s*\)/.test(e.signature)}))}function Ce(e){let t=[];for(let n of e.types)n.name&&t.push({name:n.name,kind:n.keyword===`enum`?`enum`:n.keyword,offset:n.offset,end:n.block.close,detail:n.keyword===`enum`&&n.scoped?`enum class`:n.keyword,children:[...n.enumerators.map(e=>({name:e.name,kind:`enumerator`,offset:e.offset,end:e.offset+e.name.length,detail:e.value})),...n.members.map(e=>({name:e.name,kind:`field`,offset:e.offset,end:e.offset+e.name.length,detail:e.type})),...n.methods.map(e=>({name:e.name,kind:e.isConstructor?`constructor`:`method`,offset:e.offset,end:e.block?e.block.close:e.offset+e.name.length,detail:`(${e.paramText})`}))].sort((e,t)=>e.offset-t.offset)});for(let n of e.functions)t.push({name:(n.owner?n.owner+`::`:``)+n.name,kind:n.owner?`method`:`function`,offset:n.offset,end:n.block?n.block.close:n.offset+n.name.length,detail:`(${n.paramText})`,declaration:!n.isDefinition});for(let n of e.globals)t.push({name:n.name,kind:`variable`,offset:n.offset,end:n.offset+n.name.length,detail:n.type});for(let n of e.aliases)t.push({name:n.name,kind:`alias`,offset:n.offset,end:n.offset+n.name.length,detail:n.target});for(let n of e.macros)t.push({name:n.name,kind:`macro`,offset:n.offset,end:n.offset+n.name.length,detail:n.value});return t.sort((e,t)=>e.offset-t.offset)}var we=new WeakMap;function K(e){let t=e.getVersionId(),n=we.get(e);if(n&&n.version===t)return n;let r;try{r=oe(e.getValue())}catch(t){console.warn(`Could not analyse`,e.uri.path,t),r=oe(``)}return r.version=t,r.model=e,we.set(e,r),r}var q=e=>e.path.split(`/`)[1]||``;function Te(e,t){return e.editor.getModels().filter(e=>!e.isDisposed()&&e.uri.scheme===t.uri.scheme&&q(e.uri)===q(t.uri)&&e.getLanguageId()===`cpp`)}function J(e,t,n){let r=K(t);return{files:Te(e,t).filter(e=>e!==t).map(K),file:r,model:t,offset:t.getOffsetAt(n)}}var Y=e=>e.uri.path.split(`/`).slice(2).join(`/`),X=e=>"```cpp\n"+e+"\n```",Ee=[[`main`,`A complete program`,`#include <iostream>

int main()
{
	$0
	return 0;
}
`],[`cout`,`Print a line`,"std::cout << ${1:value} << '\\n';"],[`println`,`Print a formatted line`,'std::println("${1:{\\}}", ${2:value});'],[`cin`,`Read a value`,"std::cin >> ${1:variable};"],[`getline`,`Read a whole line`,"std::getline(std::cin >> std::ws, ${1:line});"],[`for`,`Counting loop`,"for (int ${1:i}{ 0 }; ${1:i} < ${2:count}; ++${1:i})\n{\n	$0\n}"],[`fori`,`Loop over indexes of a container`,"for (std::size_t ${1:i}{ 0 }; ${1:i} < ${2:values}.size(); ++${1:i})\n{\n	$0\n}"],[`forr`,`Loop over every element`,`for (const auto& \${1:item} : \${2:container})
{
	$0
}`],[`while`,`While loop`,`while (\${1:condition})
{
	$0
}`],[`dowhile`,`Do-while loop`,`do
{
	$0
} while (\${1:condition});`],[`if`,`If statement`,`if (\${1:condition})
{
	$0
}`],[`ifelse`,`If / else`,`if (\${1:condition})
{
	$2
}
else
{
	$0
}`],[`switch`,`Switch statement`,`switch (\${1:value})
{
case \${2:1}:
	$0
	break;
default:
	break;
}`],[`func`,`Function`,`\${1:int} \${2:name}(\${3})
{
	$0
}`],[`struct`,`Struct`,`struct \${1:Name}
{
	$0
};`],[`class`,`Class with a constructor`,`class \${1:Name}
{
public:
	\${1:Name}() = default;
	$0

private:
};`],[`enum`,`Scoped enum`,`enum class \${1:Name}
{
	$0
};`],[`vector`,`A vector`,"std::vector<${1:int}> ${2:values}{ $0 };"],[`lambda`,`Lambda`,"[${1}](${2}) { $0 }"],[`try`,`Try / catch`,`try
{
	$0
}
catch (const std::exception& e)
{
	std::cerr << e.what() << '\\n';
}`],[`unique`,`Owning pointer`,"auto ${1:name}{ std::make_unique<${2:Type}>($0) };"],[`guard`,`Header guard`,`#pragma once

$0`],[`namespace`,`Namespace`,`namespace \${1:name}
{
	$0
}`],[`template`,`Function template`,`template <typename \${1:T}>
\${2:T} \${3:name}(\${4:const T& value})
{
	$0
}`],[`sort`,`Sort a container`,"std::ranges::sort(${1:values});"],[`timer`,`Measure how long code takes`,'const auto ${1:start}{ std::chrono::steady_clock::now() };\n$0\nconst auto ${2:elapsed}{ std::chrono::steady_clock::now() - ${1:start} };\nstd::cout << std::chrono::duration_cast<std::chrono::milliseconds>(${2:elapsed}).count() << " ms\\n";'],[`random`,`A random whole number`,"std::mt19937 ${1:rng}{ std::random_device{}() };\nstd::uniform_int_distribution<int> ${2:roll}{ ${3:1}, ${4:6} };\nint ${5:value}{ ${2:roll}(${1:rng}) };"],[`readfile`,`Read a file line by line`,'std::ifstream ${1:in}{ "${2:file.txt}" };\nfor (std::string ${3:line}; std::getline(${1:in}, ${3:line});)\n{\n	$0\n}'],[`mainargs`,`A program that reads its arguments`,`#include <iostream>

int main(int argc, char* argv[])
{
	for (int i{ 1 }; i < argc; ++i)
	{
		std::cout << argv[i] << '\\n';
	}
	$0
	return 0;
}
`],[`cerr`,`Print an error`,`std::cerr << \${1:"error"} << '\\n';`],[`format`,`Build text from values`,'std::format("${1:{\\}}", ${2:value})'],[`forrev`,`Loop backwards over indexes`,`for (std::size_t \${1:i}{ \${2:values}.size() }; \${1:i}-- > 0;)
{
	$0
}`],[`forenum`,`Loop with an index and the element`,`for (std::size_t \${1:i}{ 0 }; const auto& \${2:item} : \${3:container})
{
	$0
	++\${1:i};
}`],[`formap`,`Loop over a map`,`for (const auto& [\${1:key}, \${2:value}] : \${3:map})
{
	$0
}`],[`elseif`,`Else-if branch`,`else if (\${1:condition})
{
	$0
}`],[`else`,`Else branch`,`else
{
	$0
}`],[`case`,`Case in a switch`,`case \${1:value}:
	$0
	break;`],[`ternary`,`Pick one of two values`,"${1:condition} ? ${2:yes} : ${3:no}"],[`ctor`,`Constructor with a member list`,`\${1:Name}(\${2:int value})
	: \${3:m_value}{ \${4:value} }
{
	$0
}`],[`dtor`,`Destructor`,`~\${1:Name}()
{
	$0
}`],[`getter`,`Getter`,"${1:int} ${2:value}() const { return ${3:m_value}; }"],[`setter`,`Setter`,"void ${1:setValue}(${2:int} ${3:value}) { ${4:m_value} = ${3:value}; }"],[`member`,`Member variable with a default`,"${1:int} m_${2:name}{ ${3:0} };"],[`opeq`,`Equality operator`,"friend bool operator==(const ${1:Name}& a, const ${1:Name}& b) = default;"],[`opcmp`,`All comparisons at once`,"friend auto operator<=>(const ${1:Name}& a, const ${1:Name}& b) = default;"],[`opout`,`Print with <<`,`friend std::ostream& operator<<(std::ostream& out, const \${1:Name}& \${2:value})
{
	return out << $0;
}`],[`opplus`,`Addition operator`,"friend ${1:Name} operator+(const ${1:Name}& a, const ${1:Name}& b)\n{\n	return ${1:Name}{ $0 };\n}"],[`rule5`,`Copy and move members`,"${1:Name}(const ${1:Name}& other) = ${2:default};\n${1:Name}& operator=(const ${1:Name}& other) = ${2:default};\n${1:Name}(${1:Name}&& other) noexcept = ${2:default};\n${1:Name}& operator=(${1:Name}&& other) noexcept = ${2:default};\n~${1:Name}() = ${2:default};"],[`nocopy`,`Forbid copying`,"${1:Name}(const ${1:Name}&) = delete;\n${1:Name}& operator=(const ${1:Name}&) = delete;"],[`interface`,`Abstract base class`,`class \${1:Shape}
{
public:
	virtual ~\${1:Shape}() = default;
	virtual \${2:double} \${3:area}() const = 0;
};`],[`derived`,`Class that inherits`,`class \${1:Circle} : public \${2:Shape}
{
public:
	\${3:double} \${4:area}() const override
	{
		$0
	}
};`],[`structinit`,`Struct with defaults`,`struct \${1:Name}
{
	\${2:int} \${3:value}{ \${4:0} };
	$0
};`],[`enumstr`,`Name of an enum value`,`constexpr std::string_view toString(\${1:Colour} value)
{
	switch (value)
	{
	case \${1:Colour}::\${2:red}: return "\${2:red}";
	$0
	}
	return "?";
}`],[`map`,`An ordered map`,"std::map<${1:std::string}, ${2:int}> ${3:counts};"],[`umap`,`A hash map`,"std::unordered_map<${1:std::string}, ${2:int}> ${3:counts};"],[`set`,`A set of unique values`,"std::set<${1:int}> ${2:seen};"],[`array`,`A fixed-size array`,"std::array<${1:int}, ${2:5}> ${3:values}{ $0 };"],[`string`,`A string`,'std::string ${1:text}{ "$0" };'],[`optional`,`A value that may be missing`,"std::optional<${1:int}> ${2:result};"],[`variant`,`One of several types`,"std::variant<${1:int}, ${2:std::string}> ${3:value};"],[`pair`,`Two values together`,'std::pair<${1:int}, ${2:std::string}> ${3:entry}{ ${4:1}, ${5:"one"} };'],[`shared`,`Shared owning pointer`,"auto ${1:name}{ std::make_shared<${2:Type}>($0) };"],[`find`,`Find a value in a container`,`if (const auto it{ std::ranges::find(\${1:values}, \${2:wanted}) }; it != \${1:values}.end())
{
	$0
}`],[`findif`,`Find the first element that matches`,"const auto it{ std::ranges::find_if(${1:values}, [](const auto& ${2:item}) { return ${3:item > 0}; }) };"],[`countif`,`Count the elements that match`,"const auto ${1:count}{ std::ranges::count_if(${2:values}, [](const auto& ${3:item}) { return ${4:item > 0}; }) };"],[`eraseif`,`Remove the elements that match`,"std::erase_if(${1:values}, [](const auto& ${2:item}) { return ${3:item < 0}; });"],[`transform`,`Change every element`,"std::ranges::transform(${1:values}, ${1:values}.begin(), [](auto ${2:item}) { return ${3:item * 2}; });"],[`accumulate`,`Add up a container`,"const auto ${1:total}{ std::accumulate(${2:values}.begin(), ${2:values}.end(), ${3:0}) };"],[`sortby`,`Sort by a member or a rule`,"std::ranges::sort(${1:values}, [](const auto& a, const auto& b) { return ${2:a < b}; });"],[`minmax`,`Smallest and largest`,"const auto [${1:lowest}, ${2:highest}]{ std::ranges::minmax(${3:values}) };"],[`iota`,`Fill with 1, 2, 3...`,"std::iota(${1:values}.begin(), ${1:values}.end(), ${2:1});"],[`reverse`,`Reverse a container`,"std::ranges::reverse(${1:values});"],[`writefile`,`Write a file`,"std::ofstream ${1:out}{ \"${2:file.txt}\" };\n${1:out} << ${3:value} << '\\n';"],[`sstream`,`Split a line into words`,"std::istringstream ${1:words}{ ${2:line} };\nfor (std::string ${3:word}; ${1:words} >> ${3:word};)\n{\n	$0\n}"],[`tolower`,`Lower-case a string`,"std::ranges::transform(${1:text}, ${1:text}.begin(), [](unsigned char c) { return static_cast<char>(std::tolower(c)); });"],[`readint`,`Read a number, asking again on bad input`,`int \${1:value}{};
while (!(std::cin >> \${1:value}))
{
	std::cin.clear();
	std::cin.ignore(std::numeric_limits<std::streamsize>::max(), '\\n');
	std::cout << "\${2:Please enter a whole number: }";
}`],[`menu`,`A menu that repeats until quit`,`bool \${1:running}{ true };
while (\${1:running})
{
	std::cout << "1) \${2:Play}\\n2) Quit\\n> ";
	int choice{};
	std::cin >> choice;
	switch (choice)
	{
	case 1:
		$0
		break;
	default:
		\${1:running} = false;
		break;
	}
}`],[`sleep`,`Pause for a moment`,"std::this_thread::sleep_for(std::chrono::milliseconds{ ${1:500} });"],[`thread`,`Run a function on another thread`,`std::jthread \${1:worker}{ [] {
	$0
} };`],[`lock`,`Lock a mutex for this block`,"const std::lock_guard ${1:lock}{ ${2:mutex} };"],[`assert`,`Check something that must be true`,'assert(${1:condition} && "${2:what went wrong}");'],[`throw`,`Report an error with an exception`,'throw std::runtime_error{ "${1:what went wrong}" };'],[`cast`,`Convert to another type`,"static_cast<${1:int}>(${2:value})"],[`constexpr`,`A compile-time constant`,"constexpr ${1:int} ${2:name}{ ${3:value} };"],[`using`,`Another name for a type`,"using ${1:Name} = ${2:type};"],[`concept`,`A named requirement on a type`,"template <typename T>\nconcept ${1:Number} = ${2:std::integral<T> || std::floating_point<T>};"],[`classtemplate`,`Class template`,`template <typename \${1:T}>
class \${2:Name}
{
public:
	$0

private:
	\${1:T} m_value{};
};`],[`test`,`A small check that prints PASS or FAIL`,'std::cout << (${1:condition} ? "PASS" : "FAIL") << ": ${2:what is checked}\\n";'],[`todo`,`A note to come back to`,`// TODO: $0`],[`banner`,`A comment that heads a section`,"// ---------- ${1:section} ----------"],[`doc`,`A comment that documents a function`,"/// ${1:What it does.}\n/// @param ${2:name} ${3:what it is}\n/// @return ${4:what comes back}"]],De=[[`include`,"#include <${1:iostream}>"],[`pragma once`,`#pragma once`],[`define`,"#define ${1:NAME} ${2:value}"],[`ifndef`,`#ifndef \${1:NAME}
#define \${1:NAME}

$0

#endif`],[`ifdef`,`#ifdef \${1:NAME}
$0
#endif`],[`endif`,`#endif`]],Z={string:[[`npos`,`static const std::size_t npos`,`The "not found" value returned by find.`]],ios:[[`app`,`std::ios::app`,`Append: every write goes to the end of the file.`],[`binary`,`std::ios::binary`,`Do not translate line endings.`],[`in`,`std::ios::in`,`Open for reading.`],[`out`,`std::ios::out`,`Open for writing.`],[`trunc`,`std::ios::trunc`,`Empty the file when opening.`],[`ate`,`std::ios::ate`,`Start at the end of the file.`]],numeric_limits:[[`max`,`static T max()`,`The largest value of the type.`,!0],[`min`,`static T min()`,`The smallest value (for floating point: the smallest positive value).`,!0],[`lowest`,`static T lowest()`,`The most negative value.`,!0],[`epsilon`,`static T epsilon()`,`The gap between 1 and the next representable value.`,!0],[`digits`,`static const int digits`,`Number of binary digits.`]],steady_clock:[[`now`,`static time_point now()`,`The current moment.`,!0]],system_clock:[[`now`,`static time_point now()`,`The current moment.`,!0]],high_resolution_clock:[[`now`,`static time_point now()`,`The current moment.`,!0]],thread:[[`hardware_concurrency`,`static unsigned hardware_concurrency()`,`How many threads the machine can run at once.`,!0]]};function Oe(e,t){let n=e.languages.CompletionItemKind;return{f:n.Function,c:n.Class,v:n.Variable,m:n.Constant,n:n.Module,k:n.Constant}[t]||n.Text}function ke(e){for(let t of[`string`,`vector`,`map`,`optional`,`unique_ptr`,`ifstream`,`thread`,`atomic`,`future`,`path`,`mutex`,`stack`,`queue`,`bitset`,`pair`]){let n=m(t).find(t=>t.name===e);if(n)return{...n,origin:`std::`+t}}return null}function Ae(e,t,n){let{code:r}=e.file,i=n;for(;i>0&&/\s/.test(r[i-1]);)i--;let a=r.slice(Math.max(0,i-2),i),o=a===`->`?`->`:a===`::`?`::`:r[i-1]===`.`?`.`:``,s={name:t,user:[],std:null,keyword:null,op:o},c=[e.file,...e.files];if(o===`.`||o===`->`){let n=H(r,i-o.length),a=n?U(e,n):null;o===`->`&&(a=V(e,a));let l=Se(e,a).filter(e=>e.name===t);if(l.length){for(let n of l)if(!n.entry)s.std||={name:t,signature:n.signature,doc:n.doc,origin:n.origin,kind:`member`};else if(s.user.push(n.entry),n.isFunction)for(let r of I(e,t,n.origin))r.isDefinition&&!s.user.some(t=>t.offset===r.offset&&(t.file||e.file)===(r.file||e.file))&&s.user.push(r);return s}for(let e of c)for(let n of e.types){for(let r of n.members)r.name===t&&s.user.push({...r,file:e});for(let r of n.methods)r.name===t&&s.user.push({...r,file:e})}if(!s.user.length){let e=ke(t);e&&(s.std={name:t,signature:e.signature,doc:e.doc,origin:e.origin,kind:`member`})}return s}if(o===`::`){let n=H(r,i-2),a=n&&n.length?n[n.length-1].name:``;if(a===`std`&&(s.std=u.get(t)||null,s.std)||d.has(a)&&(s.std=d.get(a).get(t)||null,s.std))return s;if(Z[a]){let e=Z[a].find(e=>e[0]===t);if(e)return s.std={name:t,signature:e[1],doc:e[2],origin:`std::`+a,kind:`member`},s}let o=F(e,a);if(o){let n=o.enumerators.find(e=>e.name===t);if(n)return s.user.push({...n,file:o.file}),s;let{members:r,methods:i}=L(e,o);if(s.user.push(...r.filter(e=>e.name===t),...i.filter(e=>e.name===t)),s.user.length)return s}}let l=R(e).get(t);if(l)return s.user.push(l),s;let f=P(e);if(f){let{members:n,methods:r}=L(e,f);s.user.push(...n.filter(e=>e.name===t),...r.filter(e=>e.name===t))}let m=F(e,t);m&&s.user.push(m);for(let i of I(e,t))m&&i.isConstructor&&!/^\s*\(/.test(r.slice(n+t.length))||s.user.some(t=>t.offset===i.offset&&(t.file||e.file)===i.file)||s.user.push(i);let h=le(e,t);h&&s.user.push(h);let g=ue(e,t);if(g&&s.user.push(g),!s.user.length){let n=de(e,t);n&&s.user.push(n)}for(let e of c){let n=e.macros.find(e=>e.name===t);n&&s.user.push({...n,kind:`macro`,file:e})}return!s.user.length&&e.file.templateParams.has(t)&&s.user.push({kind:`template`,name:t}),s.user.length||(p.has(t)?s.keyword=p.get(t):e.file.usingStd||e.file.usingNames.has(t)?s.std=u.get(t)||null:t===`std`&&(s.std={name:`std`,signature:`namespace std`,doc:`The namespace that holds the whole standard library.`,kind:`n`})),s}function je(e,t){let n=t.file&&t.file.model&&t.file.model!==e.model?`\n\nDeclared in \`${Y(t.file.model)}\``:``,r=t.doc?`

`+t.doc:``;if(t.kind===`function`)return X(`${t.owner&&!t.signature.includes(t.owner+`::`)?`// in `+t.owner+`
`:``}${t.signature}`)+r+n;if(t.kind===`type`){if(t.keyword===`enum`)return X(`enum ${t.scoped?`class `:``}${t.name} { ${t.enumerators.slice(0,10).map(e=>e.name).join(`, `)}${t.enumerators.length>10?`, ...`:``} }`)+r+n;let e=t.members.slice(0,8).map(e=>`    ${e.type} ${e.name};`),i=t.methods.filter(e=>!e.name.startsWith(`~`)).slice(0,8).map(e=>`    ${e.signature};`),a=t.members.length+t.methods.length>e.length+i.length?[`    // ...`]:[];return X(`${t.keyword} ${t.name}${t.bases&&t.bases.length?` : `+t.bases.join(`, `):``}\n{\n${[...e,...i,...a].join(`
`)}\n}`)+r+n}if(t.kind===`enumerator`)return X(`${t.owner?t.owner+`::`:``}${t.name}${t.value?` = `+t.value:``}`)+`

A value of the enum.`+n;if(t.kind===`alias`)return X(`using ${t.name} = ${t.target}`)+`

Another name for that type.`+n;if(t.kind===`macro`)return X(`#define ${t.name}${t.params||``} ${t.value||``}`)+`

A preprocessor macro: plain text replacement before compiling.`+n;if(t.kind===`template`)return X(`typename ${t.name}`)+`

A template parameter: a type chosen where the template is used.`;let i=/\bauto\b/.test(t.type||``)?xe(G({...e,file:t.file||e.file},t)):``,a={local:`local variable`,param:`parameter`,member:`member of ${t.owner}`,global:`global variable`}[t.kind]||`variable`;return X(`${t.type} ${t.name}`)+`\n\n(${a})`+(i?`  The compiler works out the type: \`${i}\`.`:``)+r+n}function Me(e){let n=t.courses&&t.courses.cpp,r=``;if(n)for(let t of n.milestones){let n=t.lessons.find(t=>t.id===e);n&&(r=n.title)}return`[Lesson ${e}${r?`: `+r:``}](command:cairn.lesson?${encodeURIComponent(JSON.stringify([e]))})`}function Ne(e,n,r,i){if(!i||t.settings.autoInclude===!1||r.importsStd||r.includes.some(e=>e.name===i))return null;let a=0;if(r.includes.length){let e=r.includes.filter(e=>e.system),t=(e.length?e:r.includes).at(-1);a=n.getPositionAt(t.offset).lineNumber}else{let e=Math.min(n.getLineCount(),40);for(let t=1;t<=e;t++){let e=n.getLineContent(t).trim();if(/^(\/\/|\/\*|\*)/.test(e)||/^#\s*(pragma|ifndef|define)\b/.test(e))a=t;else if(e!==``)break}}let o=!r.includes.length&&n.getLineCount()>a&&n.getLineContent(a+1).trim()!==``;return{range:new e.Range(a+1,1,a+1,1),text:`#include <${i}>\n${o?`
`:``}`}}function Pe(e,r,i,a){let o=e.languages.CompletionItemKind,s=e.languages.CompletionItemInsertTextRule.InsertAsSnippet,c={suggestions:[]},l=J(e,r,i),{file:f}=l,{code:m}=f,h=r.getLineContent(i.lineNumber),y=h.slice(0,i.column-1),b=r.getWordUntilPosition(i),x=new e.Range(i.lineNumber,b.startColumn,i.lineNumber,b.endColumn),S=a.triggerCharacter,C=h[b.endColumn-1]===`(`,w=/^\s*#\s*include\s*([<"])([^>"]*)$/.exec(y);if(w){let t=i.column-w[2].length,n=new e.Range(i.lineNumber,t,i.lineNumber,i.column),a=w[1]===`<`?`>`:`"`,s=h[i.column-1]===a?``:a;if(w[1]===`<`)return{suggestions:g.map(e=>({label:e,kind:o.File,insertText:e+s,range:n,detail:`standard header`}))};let c=Y(r),l=e.editor.getModels().filter(e=>!e.isDisposed()&&q(e.uri)===q(r.uri)&&/\.(h|hpp)$/i.test(e.uri.path)).map(Y).filter(e=>e!==c),u=c.includes(`/`)?c.slice(0,c.lastIndexOf(`/`)+1):``;return{suggestions:l.map(e=>({label:u&&e.startsWith(u)?e.slice(u.length):e,kind:o.File,insertText:(u&&e.startsWith(u)?e.slice(u.length):e)+s,range:n,detail:`your header`}))}}if(/^\s*#\s*\w*$/.test(y)){let t=y.indexOf(`#`),n=new e.Range(i.lineNumber,t+1,i.lineNumber,i.column);return{suggestions:De.map(([e,t])=>({label:`#`+e,kind:o.Keyword,insertText:t,insertTextRules:s,range:n,filterText:`#`+e}))}}if(S===`<`||S===`"`||S===`#`||l.offset>0&&f.mask[l.offset-1]&&(l.offset>=m.length||f.mask[l.offset]||m[l.offset]===`
`||m[l.offset]===`\r`||m[l.offset]===`"`))return c;let T=l.offset-b.word.length;for(;T>0&&(m[T-1]===` `||m[T-1]===`	`);)T--;let E=m.slice(Math.max(0,T-2),T),D=E===`->`?`->`:E===`::`?`::`:m[T-1]===`.`&&!/\d/.test(m[T-2]||``)&&m[T-2]!==`.`?`.`:``;if(!D&&(S===`.`||S===`>`||S===`:`))return c;let O=(e,t)=>C?{insertText:e}:t?{insertText:e+`()`}:{insertText:e+`($0)`,insertTextRules:s,command:{id:`editor.action.triggerParameterHints`,title:`Parameter hints`}},k=[],A=new Set,j=(e,t=e.label)=>{A.has(t)||(A.add(t),k.push({range:x,...e}))};if(D===`.`||D===`->`){let e=H(m,T-D.length),t=e?U({...l,offset:T},e):null;D===`->`&&(t=V(l,t));let n=P(l),r=Se(l,t).filter(e=>!e.access||e.access===`public`||n&&(n.name===e.origin||e.access===`protected`));for(let e of r)j({label:e.name,kind:e.isFunction?o.Method:o.Field,detail:e.signature,documentation:e.doc?{value:e.doc}:void 0,sortText:(e.isFunction?`1`:`0`)+e.name,...e.isFunction?O(e.name,e.noArgs):{insertText:e.name}});if(!r.length&&!t){for(let e of[f,...l.files])for(let t of e.types){for(let e of t.members)j({label:e.name,kind:o.Field,detail:`${e.type} ${e.name}  (in ${t.name})`,insertText:e.name,sortText:`0`+e.name});for(let e of t.methods)e.isConstructor||e.name.startsWith(`~`)||/^operator/.test(e.name)||j({label:e.name,kind:o.Method,detail:`${e.signature}  (in ${t.name})`,sortText:`1`+e.name,...O(e.name,!e.params.length)})}for(let e of _){let t=ke(e);j({label:e,kind:t&&t.isFunction?o.Method:o.Field,detail:t?t.signature:``,sortText:`5`+e,...t&&t.isFunction?O(e,/\(\s*\)/.test(t.signature)):{insertText:e}})}}return{suggestions:k}}if(D===`::`){let t=H(m,T-2),n=t&&t.length?t[t.length-1].name:``,i=t=>{let n=Ne(e,r,f,t.header);j({label:t.name,kind:Oe(e,t.kind),detail:t.signature+(n?`   (adds #include <${t.header}>)`:``),documentation:{value:t.doc+(t.header?`\n\n\`#include <${t.header}>\``:``)},additionalTextEdits:n?[n]:void 0,...t.kind===`f`?O(t.name,/\(\s*\)/.test(t.signature)):{insertText:t.name}})};if(n===`std`&&t.length===1){for(let e of u.values())i(e);return{suggestions:k}}if(d.has(n)){for(let e of d.get(n).values())i(e);return{suggestions:k}}if(Z[n]){for(let[e,t,r,i]of Z[n])j({label:e,kind:i?o.Method:o.Constant,detail:t,documentation:{value:r},insertText:i&&!C?e+`()`:e});return{suggestions:k}}let a=F(l,n);if(a){for(let e of a.enumerators)j({label:e.name,kind:o.EnumMember,detail:`${a.name}::${e.name}${e.value?` = `+e.value:``}`,insertText:e.name,sortText:`0`+String(a.enumerators.indexOf(e)).padStart(3,`0`)});let{members:e,methods:t}=L(l,a);for(let t of e)j({label:t.name,kind:o.Field,detail:`${t.type} ${t.name}`,insertText:t.name});for(let e of t)j({label:e.name,kind:e.isConstructor?o.Constructor:o.Method,detail:e.signature,documentation:e.doc?{value:e.doc}:void 0,insertText:e.name});for(let e of[f,...l.files])for(let t of e.types)t.parent===a.name&&t.name&&j({label:t.name,kind:o.Class,detail:`${t.keyword} ${t.name}`,insertText:t.name});return{suggestions:k}}let s=e=>e.ns&&e.ns.split(`::`).pop()===n;for(let e of[f,...l.files]){for(let t of e.functions)s(t)&&!t.owner&&j({label:t.name,kind:o.Function,detail:t.signature,...O(t.name,!t.params.length)});for(let t of e.types)s(t)&&t.name&&j({label:t.name,kind:o.Class,detail:`${t.keyword} ${t.name}`,insertText:t.name});for(let t of e.globals)s(t)&&j({label:t.name,kind:o.Variable,detail:`${t.type} ${t.name}`,insertText:t.name});for(let t of e.aliases)s(t)&&j({label:t.name,kind:o.Class,detail:`using ${t.name} = ${t.target}`,insertText:t.name})}return{suggestions:k}}for(let e of R(l).values()){let t=/\bauto\b/.test(e.type)?xe(G(l,e)):``;j({label:e.name,kind:o.Variable,detail:`${t||e.type} ${e.name}   (${e.kind===`param`?`parameter`:`local`})`,insertText:e.name,sortText:`0`+e.name})}let M=P(l);if(M){let{members:e,methods:t}=L(l,M);for(let t of e)j({label:t.name,kind:o.Field,detail:`${t.type} ${t.name}   (member of ${t.owner})`,insertText:t.name,sortText:`1`+t.name});for(let e of t)e.isConstructor||e.name.startsWith(`~`)||/^operator/.test(e.name)||j({label:e.name,kind:o.Method,detail:e.signature,documentation:e.doc?{value:e.doc}:void 0,sortText:`1`+e.name,...O(e.name,!e.params.length)})}for(let e of[f,...l.files]){let t=e===f?``:`   (${Y(e.model)})`;for(let n of e.functions)!n.owner&&!/^operator/.test(n.name)&&j({label:n.name,kind:o.Function,detail:n.signature+t,documentation:n.doc?{value:n.doc}:void 0,sortText:`2`+n.name,...n.name===`main`?{insertText:n.name}:O(n.name,!n.params.length)});for(let n of e.types){n.name&&j({label:n.name,kind:n.keyword===`enum`?o.Enum:n.keyword===`struct`?o.Struct:o.Class,detail:`${n.keyword===`enum`&&n.scoped?`enum class`:n.keyword} ${n.name}${t}`,documentation:n.doc?{value:n.doc}:void 0,insertText:n.name,sortText:`2`+n.name});for(let e of n.enumerators)n.scoped&&n.name?j({label:`${n.name}::${e.name}`,kind:o.EnumMember,detail:`value of ${n.name}`,insertText:`${n.name}::${e.name}`,filterText:`${e.name} ${n.name}::${e.name}`,sortText:`3`+e.name}):j({label:e.name,kind:o.EnumMember,detail:`value of ${n.name||`enum`}`,insertText:e.name,sortText:`2`+e.name})}for(let n of e.globals)j({label:n.name,kind:/\bconst/.test(n.type)?o.Constant:o.Variable,detail:`${n.type} ${n.name}${t}`,insertText:n.name,sortText:`2`+n.name});for(let t of e.aliases)j({label:t.name,kind:o.Class,detail:`using ${t.name} = ${t.target}`,insertText:t.name,sortText:`2`+t.name});for(let t of e.macros)j({label:t.name,kind:o.Constant,detail:`#define ${t.name} ${t.value}`,insertText:t.name,sortText:`2`+t.name});for(let t of e.namespaces)j({label:t,kind:o.Module,detail:`namespace ${t}`,insertText:t,sortText:`2`+t})}for(let e of f.templateParams)j({label:e,kind:o.TypeParameter,detail:`template parameter`,insertText:e,sortText:`1`+e});for(let[e,r,i]of Ee){let a=n(i,`cpp`,t.settings.braceStyle);j({label:e,kind:o.Snippet,detail:r,insertText:a.replace(/\t/g,`    `),insertTextRules:s,sortText:`4`+e,documentation:{value:X(a.replace(/\$\{\d+:([^}]*)\}/g,`$1`).replace(/\$\d/g,``).replace(/\t/g,`    `))}},`snippet:`+e)}for(let e of v){let t=p.get(e);j({label:e,kind:o.Keyword,insertText:e,detail:t?t.doc.slice(0,70)+(t.doc.length>70?`…`:``):`keyword`,documentation:t?{value:t.doc}:void 0,sortText:`5`+e})}j({label:`std`,kind:o.Module,detail:`namespace std: the standard library`,insertText:`std`,sortText:`3std`});let ee=f.usingStd;for(let t of u.values()){if(A.has(t.name))continue;let n=ee||f.usingNames.has(t.name),i=n?t.name:`std::`+t.name,a=Ne(e,r,f,t.header),o=t.kind===`f`?O(i,/\(\s*\)/.test(t.signature)):{insertText:i};j({label:{label:t.name,description:n?``:`std::`},kind:Oe(e,t.kind),filterText:t.name,detail:t.signature+(a?`   (adds #include <${t.header}>)`:``),documentation:{value:t.doc+(t.header?`\n\n\`#include <${t.header}>\``:``)},additionalTextEdits:a?[a]:void 0,sortText:`6`+t.name,...o},`std:`+t.name)}let te=new Set(m.match(/\b[A-Za-z_]\w{2,}\b/g)||[]);te.delete(b.word);for(let e of te)!A.has(e)&&!u.has(e)&&j({label:e,kind:o.Text,insertText:e,sortText:`8`+e});return{suggestions:k}}function Fe(e,t,n){let r=[],i=Math.max(0,e.search(/[({]/));for(let n of t){let t=e.indexOf(n,i);t<0?r.push({label:n}):(r.push({label:[t,t+n.length]}),i=t+n.length)}return{label:e,parameters:r,documentation:n?{value:n}:void 0}}function Q(e,t){let n=e.signature.indexOf(`(`);if(n<0)return null;let r=0,i=-1;for(let t=n;t<e.signature.length;t++)if(e.signature[t]===`(`)r++;else if(e.signature[t]===`)`&&--r===0){i=t;break}let a=i>n?D(e.signature.slice(n+1,i)).map(e=>e.trim()).filter(Boolean):[];return Fe(e.signature,a,e.doc+(t?`\n\n${t}`:e.header?`\n\n\`#include <${e.header}>\``:``))}function Ie(e,t,n){let r=J(e,t,n),{code:i}=r.file;if(r.offset>0&&r.file.mask[r.offset-1]&&r.file.mask[r.offset])return null;let a=0,o=0,s=r.offset-1;for(;s>=0&&r.offset-s<3e3;s--){let e=i[s];if(e===`)`||e===`]`||e===`}`)a++;else if(e===`(`||e===`[`||e===`{`){if(a===0)break;a--}else if(e===`,`&&a===0)o++;else if(e===`;`&&a===0)return null}if(s<0||i[s]!==`(`&&i[s]!==`{`)return null;let c=i[s]===`{`,l=H(i,s);if(!l||!l.length)return null;let f=l[l.length-1],p={...r,offset:s},m=[],h=e=>m.push(Fe((e.owner&&e.isConstructor,``+e.signature),e.params.map(e=>e.text),e.doc)),g=e=>{if(!e)return!1;let t=e.methods.filter(e=>e.isConstructor&&!e.isDeleted);if(t.length)return t.forEach(h),!0;let n=e.members.filter(e=>!e.isStatic);if(!n.length)return!1;let r=n.map(e=>`${e.type} ${e.name}`);return m.push(Fe(`${e.name}{ ${r.join(`, `)} }`,r,`Fills the members in the order they are declared.`)),!0};if(f.op===`.`||f.op===`->`){let e=U(p,l.slice(0,-1));f.op===`->`&&(e=V(r,e));for(let t of Se(r,e))if(t.name===f.name&&t.isFunction){if(t.entry)h(t.entry);else{let e=Q(t,t.origin);e&&m.push(e)}}if(!m.length&&!e){let e=ke(f.name);if(e&&e.isFunction){let t=Q(e,e.origin);t&&m.push(t)}}}else if(f.op===`::`){let e=l[l.length-2].name,t=e===`std`?u.get(f.name):d.has(e)?d.get(e).get(f.name):null;if(t&&t.kind===`f`){let e=Q(t);e&&m.push(e)}else if(!t){let t=F(r,e);t&&f.name===t.name?g(t):t?L(r,t).methods.filter(e=>e.name===f.name).forEach(h):I(r,f.name).forEach(h)}}else{let e=F(r,f.name);if(e)g(e);else{let e=[...r.file.locals,...r.file.globals].find(e=>e.offset===f.offset),t=e?F(r,(z(e.type)||{}).name):null;if(t)g(t);else if(!c){let e=P(p),t=e?L(r,e).methods.filter(e=>e.name===f.name):[];if((t.length?t:I(r,f.name).filter(e=>e.isDefinition||!I(r,f.name).some(t=>t!==e&&t.isDefinition&&t.paramText===e.paramText))).forEach(h),!m.length&&(r.file.usingStd||r.file.usingNames.has(f.name))){let e=u.get(f.name);if(e&&e.kind===`f`){let t=Q(e);t&&m.push(t)}}}}}if(!m.length)return null;let _=m.filter((e,t)=>m.findIndex(t=>t.label===e.label)===t),v=_.findIndex(e=>e.parameters.length>o);return v<0&&(v=0),{value:{signatures:_,activeSignature:v,activeParameter:Math.min(o,Math.max(0,_[v].parameters.length-1))},dispose(){}}}function Le(e,t,n){let r=t.getWordAtPosition(n);if(!r)return null;let i=t.getOffsetAt({lineNumber:n.lineNumber,column:r.startColumn}),a=J(e,t,{lineNumber:n.lineNumber,column:r.endColumn});if(a.file.mask[i])return null;let o=t.getLineContent(n.lineNumber),s=new e.Range(n.lineNumber,r.startColumn,n.lineNumber,r.endColumn),c=/^\s*#\s*include\s*<([^>]+)>/.exec(o);if(c)return{range:s,contents:[{value:`Standard header \`<${c[1]}>\`\n\nProvides: ${[...u.values()].filter(e=>e.header===c[1]).slice(0,14).map(e=>"`"+e.name+"`").join(`, `)||`see the lesson that introduces it`}`}]};let l=Ae(a,r.word,i),d=[],f=new Set;for(let e of l.user){let t=e.kind===`function`?e.signature.replace(/^(?:static |virtual )+/,``).replace(/ = [^)]*(?=[,)])/g,``):e.kind+e.name+e.offset;f.has(t)||f.size>=4||(f.add(t),d.push({value:je(a,e)}))}if(!d.length&&l.std){let e=l.std;d.push({value:X(e.signature)+`

`+e.doc+(e.header?`\n\n\`#include <${e.header}>\``:e.origin?`\n\nMember of \`${e.origin}\``:``)})}return!d.length&&l.keyword&&d.push({value:`**${r.word}**: ${l.keyword.doc}\n\n${Me(l.keyword.lesson)}`,isTrusted:!0}),d.length?{range:s,contents:d}:null}function Re(e,t,n){let r=n.file&&n.file.model?n.file.model:t.model;if(n.offset===void 0||r.isDisposed())return null;let i=r.getPositionAt(n.offset);return{uri:r.uri,range:new e.Range(i.lineNumber,i.column,i.lineNumber,i.column+n.name.length)}}function ze(e,t,n){let r=t.getLineContent(n.lineNumber),i=/^\s*#\s*include\s*"([^"]+)"/.exec(r);if(i){let n=e.editor.getModels().find(e=>!e.isDisposed()&&q(e.uri)===q(t.uri)&&(Y(e)===i[1]||Y(e).endsWith(`/`+i[1])||Y(e).split(`/`).pop()===i[1].split(`/`).pop()));return n?{uri:n.uri,range:new e.Range(1,1,1,1)}:null}let a=t.getWordAtPosition(n);if(!a)return null;let o=t.getOffsetAt({lineNumber:n.lineNumber,column:a.startColumn}),s=J(e,t,{lineNumber:n.lineNumber,column:a.endColumn});if(s.file.mask[o])return null;let c=Ae(s,a.word,o).user.filter(e=>e.offset!==void 0),l=e=>(e.file&&e.file.model?e.file.model:t)===t&&e.offset===o,u=c.find(l),d=c.filter(e=>!l(e));d.length||(d=c);let f=d.filter(e=>e.kind===`function`&&e.isDefinition);f.length&&!(u&&u.isDefinition)&&(d=[...f,...d.filter(e=>e.kind!==`function`)]);let p=new Set;return d.map(t=>Re(e,s,t)).filter(e=>{if(!e)return!1;let t=e.uri.toString()+`:`+e.range.startLineNumber+`:`+e.range.startColumn;return!p.has(t)&&(p.add(t),!0)})}function $(e,t,n,r=!0){let i=t.getWordAtPosition(n);if(!i)return null;let a=t.getOffsetAt({lineNumber:n.lineNumber,column:i.startColumn}),o=J(e,t,{lineNumber:n.lineNumber,column:i.endColumn});if(o.file.mask[a])return null;let s=Ae(o,i.word,a);if(!s.user.length)return{word:i,found:s,ranges:[]};let c=s.user[0],l=RegExp(`\\b`+i.word.replace(/[.*+?^${}()|[\]\\]/g,`\\$&`)+`\\b`,`g`),u=[],d=(t,n,r)=>{let a=t.model;l.lastIndex=n;let o;for(;(o=l.exec(t.code))&&o.index<r;){if(t.mask[o.index])continue;let n=a.getPositionAt(o.index);u.push({uri:a.uri,range:new e.Range(n.lineNumber,n.column,n.lineNumber,n.column+i.word.length)})}};if((c.kind===`local`||c.kind===`param`)&&c.scope)d(o.file,c.scope.headStart,c.scope.close);else for(let e of r?[o.file,...o.files]:[o.file])d(e,0,e.code.length);return{word:i,found:s,ranges:u}}var Be=[`type`,`function`,`namespace`,`enumMember`,`parameter`,`property`,`macro`];function Ve(e,t){let n=K(t),r=Te(e,t).filter(e=>e!==t).map(K),{code:i}=n,a=new Set(n.templateParams),o=new Set,s=new Set([`std`]),c=new Set;for(let e of[n,...r]){for(let t of e.types){t.name&&a.add(t.name);for(let e of t.enumerators)o.add(e.name)}for(let t of e.aliases)a.add(t.name);for(let t of e.namespaces)s.add(t);for(let t of e.macros)c.add(t.name)}let l={files:r,file:n,offset:0},f=[];for(let e of n.blocks)if(e.kind===`function`&&e.fnEntry){let t=e.fnEntry.owner?F(l,e.fnEntry.owner):null;f.push({start:e.headStart,bodyStart:e.open,end:e.close,params:new Set(e.fnEntry.params.map(e=>e.name).filter(Boolean)),fields:t?new Set(L(l,t).members.map(e=>e.name)):null})}else e.kind===`lambda`?f.push({start:e.headStart,bodyStart:e.open,end:e.close,params:new Set((e.params||[]).map(e=>e.name).filter(Boolean)),fields:null,lambda:!0}):e.kind===`class`&&e.typeEntry&&f.push({start:e.open,bodyStart:e.open,end:e.close,params:new Set,fields:new Set(e.typeEntry.members.map(e=>e.name)),cls:!0});let p=[],m=/\b[A-Za-z_]\w*/g,h=0,g=0,_=0,y=0,b=0,x;for(;x=m.exec(i);){let e=x[0],t=x.index;if(v.includes(e))continue;let n=t-1;for(;n>=0&&(i[n]===` `||i[n]===`	`);)n--;let r=t+e.length;for(;r<i.length&&(i[r]===` `||i[r]===`	`);)r++;let l=i.slice(Math.max(0,n-1),n+1),m=l===`::`,S=i[n]===`.`||l===`->`,C=i[r]===`(`,w=-1,T=null,E=null,D=!1;for(let n of f)t<n.start||t>n.end||(n.params.has(e)&&(D=!0),n.fields&&(E=n.fields),!n.cls&&t>n.bodyStart&&(T=n));if(c.has(e))w=6;else if(S)w=C?1:5;else if(i.slice(r,r+2)===`::`&&s.has(e))w=2;else if(i.slice(r,r+2)===`::`&&d.has(e)&&m)w=2;else if(a.has(e))w=0;else if(m){let t=u.get(e)||[...d.values()].map(t=>t.get(e)).find(Boolean);t&&t.kind===`c`?w=0:t&&t.kind===`n`?w=2:C||t&&t.kind===`f`?w=1:o.has(e)&&(w=3)}else if(o.has(e)&&!D)w=3;else if(C){let e=n;for(;e>=0&&/\w/.test(i[e]);)e--;let t=i.slice(e+1,n+1);T&&(i[n]===`>`&&i[n-1]!==`-`||t&&!v.includes(t)&&!/^\d/.test(t))||(w=1)}else D?w=4:E&&E.has(e)&&(w=5);if(w<0)continue;for(;_<t;){let e=i.indexOf(`
`,_);if(e<0||e>=t)break;h++,g=e+1,_=e+1}let O=t-g;p.push(h-y,h===y?O-b:O,e.length,w,0),y=h,b=O}return{data:new Uint32Array(p)}}function He(e,t,n,r){let i=K(t),a=[];for(let n of r.markers){let r=/'(?:std::)?([A-Za-z_]\w*)'/.exec(n.message)||/"(?:std::)?([A-Za-z_]\w*)"/.exec(n.message),o=r?r[1]:(t.getWordAtPosition({lineNumber:n.startLineNumber,column:n.startColumn})||{}).word,s=o?u.get(o):null;if(!s)continue;let c=Ne(e,t,i,s.header);c&&a.push({title:`Add #include <${s.header}>`,kind:`quickfix`,diagnostics:[n],isPreferred:!0,edit:{edits:[{resource:t.uri,textEdit:c,versionId:t.getVersionId()}]}});let l=t.getLineContent(n.startLineNumber),d=RegExp(`(?<![\\w:.>])`+o+`\\b`,`g`),f;for(;(f=d.exec(l))&&!i.usingStd;){a.push({title:`Write std::${o}`,kind:`quickfix`,diagnostics:[n],edit:{edits:[{resource:t.uri,versionId:t.getVersionId(),textEdit:{range:new e.Range(n.startLineNumber,f.index+1,n.startLineNumber,f.index+1),text:`std::`}}]}});break}}return{actions:a,dispose(){}}}var Ue={class:`Class`,struct:`Struct`,union:`Struct`,enum:`Enum`,enumerator:`EnumMember`,field:`Field`,method:`Method`,constructor:`Constructor`,function:`Function`,variable:`Variable`,alias:`Interface`,macro:`Constant`};function We(t){let n=t.languages;t.editor.registerCommand(`cairn.lesson`,(t,n)=>{/^\d+\.\d+$/.test(String(n))&&e(`/c/cpp/l/${n}`)}),n.registerCompletionItemProvider(`cpp`,{triggerCharacters:[`.`,`>`,`:`,`<`,`"`,`#`],provideCompletionItems:(e,n,r)=>{try{return Pe(t,e,n,r)}catch(e){return console.warn(`completion`,e),{suggestions:[]}}}}),n.registerSignatureHelpProvider(`cpp`,{signatureHelpTriggerCharacters:[`(`,`,`,`{`],signatureHelpRetriggerCharacters:[`)`],provideSignatureHelp:(e,n)=>{try{return Ie(t,e,n)}catch(e){return console.warn(`signature`,e),null}}}),n.registerHoverProvider(`cpp`,{provideHover:(e,n)=>{try{return Le(t,e,n)}catch(e){return console.warn(`hover`,e),null}}}),n.registerDefinitionProvider(`cpp`,{provideDefinition:(e,n)=>{try{return ze(t,e,n)}catch(e){return console.warn(`definition`,e),null}}}),n.registerReferenceProvider(`cpp`,{provideReferences:(e,n)=>{try{let r=$(t,e,n);return r?r.ranges:[]}catch{return[]}}}),n.registerDocumentHighlightProvider(`cpp`,{provideDocumentHighlights:(e,n)=>{try{let r=$(t,e,n,!1);return r&&r.ranges.length?r.ranges.filter(t=>t.uri.toString()===e.uri.toString()).map(e=>({range:e.range})):null}catch{return null}}}),n.registerRenameProvider(`cpp`,{resolveRenameLocation(e,n){let r=$(t,e,n);return!r||!r.ranges.length?{rejectReason:`Only names declared in your own files can be renamed.`,range:new t.Range(1,1,1,1),text:``}:{range:new t.Range(n.lineNumber,r.word.startColumn,n.lineNumber,r.word.endColumn),text:r.word.word}},provideRenameEdits(e,n,r){if(!/^[A-Za-z_]\w*$/.test(r)||v.includes(r))return{edits:[],rejectReason:`"${r}" is not a valid name.`};let i=$(t,e,n);return!i||!i.ranges.length?{edits:[],rejectReason:`Only names declared in your own files can be renamed.`}:{edits:i.ranges.map(e=>({resource:e.uri,versionId:void 0,textEdit:{range:e.range,text:r}}))}}}),n.registerDocumentSymbolProvider(`cpp`,{provideDocumentSymbols(e){let r=i=>{let a=e.getPositionAt(i.offset),o=e.getPositionAt(Math.max(i.end+1,i.offset+i.name.length));return{name:i.name,detail:i.detail||``,kind:n.SymbolKind[Ue[i.kind]||`Variable`],tags:[],range:new t.Range(a.lineNumber,1,o.lineNumber,o.column),selectionRange:new t.Range(a.lineNumber,a.column,a.lineNumber,a.column+i.name.split(`::`).pop().length),children:(i.children||[]).map(r)}};try{return Ce(K(e)).map(r)}catch{return[]}}}),n.registerDocumentSemanticTokensProvider(`cpp`,{getLegend:()=>({tokenTypes:Be,tokenModifiers:[]}),provideDocumentSemanticTokens:e=>{try{return Ve(t,e)}catch(e){return console.warn(`tokens`,e),{data:new Uint32Array}}},releaseDocumentSemanticTokens(){}}),n.registerCodeActionProvider(`cpp`,{provideCodeActions:(e,n,r)=>{try{return He(t,e,n,r)}catch{return{actions:[],dispose(){}}}}},{providedCodeActionKinds:[`quickfix`]})}function Ge(e){try{return Ce(K(e))}catch{return[]}}export{We as i,Ge as n,Te as r,K as t};